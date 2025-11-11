/**
 * Schema Parser for Shopify Liquid Sections
 *
 * Converts Shopify Liquid section schemas into Storybook ArgTypes controls,
 * enabling automatic story generation from Liquid section definitions.
 *
 * @module schemaParser
 */
// ============================================================================
// CORE PARSER FUNCTIONS
// ============================================================================
/**
 * Parse a Shopify Liquid section schema into Storybook ArgTypes
 *
 * @param schema - The Liquid section schema to parse
 * @param options - Parsing options
 * @returns Storybook ArgTypes configuration
 *
 * @example
 * ```typescript
 * const schema = {
 *   name: "My Section",
 *   settings: [
 *     { type: "text", id: "title", label: "Title", default: "Hello" }
 *   ]
 * };
 *
 * const argTypes = parseSchema(schema);
 * // {
 * //   title: {
 * //     control: "text",
 * //     description: "Title",
 * //     defaultValue: "Hello"
 * //   }
 * // }
 * ```
 */
export function parseSchema(schema, options = {}) {
    const argTypes = {};
    let currentCategory;
    // Parse section settings
    for (const setting of schema.settings) {
        if (setting.type === 'header') {
            currentCategory = setting.content;
            continue;
        }
        if (setting.type === 'paragraph') {
            continue; // Skip non-configurable paragraph elements
        }
        const argType = parseSetting(setting, currentCategory);
        if (argType && 'id' in setting) {
            argTypes[setting.id] = argType;
        }
    }
    // Optionally parse blocks
    if (options.includeBlocks && schema.blocks) {
        for (const block of schema.blocks) {
            const blockConfig = parseBlock(block);
            // Prefix block settings with block type to avoid conflicts
            for (const [key, value] of Object.entries(blockConfig.argTypes)) {
                argTypes[`${block.type}_${key}`] = {
                    ...value,
                    table: {
                        ...value.table,
                        category: `Block: ${block.name}`,
                    },
                };
            }
        }
    }
    return argTypes;
}
/**
 * Parse a single Liquid setting into a Storybook ArgType
 *
 * @param setting - The Liquid setting to parse
 * @param category - Optional category for table grouping
 * @returns Storybook ArgType or null for non-configurable settings
 */
export function parseSetting(setting, category) {
    // Skip non-configurable settings
    if (setting.type === 'header' || setting.type === 'paragraph') {
        return null;
    }
    const argType = {
        description: buildDescription(setting),
        table: {
            category,
        },
    };
    // Add default value if present
    if ('default' in setting && setting.default !== undefined) {
        argType.defaultValue = setting.default;
        argType.table.defaultValue = { summary: String(setting.default) };
    }
    // Map control type based on setting type
    switch (setting.type) {
        case 'text':
        case 'url':
            argType.control = 'text';
            argType.table.type = { summary: 'string' };
            break;
        case 'textarea':
        case 'richtext':
        case 'liquid':
            argType.control = 'text';
            argType.table.type = { summary: 'text' };
            break;
        case 'number':
            argType.control = 'number';
            argType.table.type = { summary: 'number' };
            break;
        case 'range':
            argType.control = {
                type: 'range',
                min: setting.min,
                max: setting.max,
                step: setting.step,
            };
            argType.table.type = {
                summary: `number (${setting.min}-${setting.max}, step: ${setting.step})`,
            };
            if (setting.unit) {
                argType.description += ` (${setting.unit})`;
            }
            break;
        case 'select':
            argType.control = {
                type: 'select',
                options: setting.options.map((opt) => opt.value),
            };
            argType.table.type = {
                summary: setting.options.map((opt) => `"${opt.value}"`).join(' | '),
            };
            break;
        case 'radio':
            argType.control = {
                type: 'radio',
                options: setting.options.map((opt) => opt.value),
            };
            argType.table.type = {
                summary: setting.options.map((opt) => `"${opt.value}"`).join(' | '),
            };
            break;
        case 'checkbox':
            argType.control = 'boolean';
            argType.table.type = { summary: 'boolean' };
            break;
        case 'color':
            argType.control = 'color';
            argType.table.type = { summary: 'color' };
            break;
        case 'color_background':
            argType.control = 'text';
            argType.table.type = { summary: 'gradient' };
            argType.description += ' (CSS gradient or color)';
            break;
        case 'image_picker':
            argType.control = 'text';
            argType.table.type = { summary: 'image URL' };
            argType.description += ' (Paste image URL)';
            break;
        case 'video':
            argType.control = 'text';
            argType.table.type = { summary: 'video URL' };
            argType.description += ' (Paste video URL)';
            break;
        case 'page':
            argType.control = 'text';
            argType.table.type = { summary: 'page handle' };
            argType.description += ' (Page handle or URL)';
            break;
        default:
            // Fallback for unknown types
            argType.control = 'text';
            argType.table.type = { summary: 'string' };
            console.warn(`Unknown setting type: ${setting.type}`);
    }
    // Handle conditional visibility
    if ('visible_if' in setting && setting.visible_if) {
        // Extract condition from Liquid syntax
        // Example: "{{ section.settings.autoplay }}" -> autoplay
        const match = setting.visible_if.match(/settings\.(\w+)/);
        if (match) {
            argType.if = { arg: match[1] };
        }
    }
    return argType;
}
/**
 * Build a description string from a Liquid setting
 *
 * @param setting - The Liquid setting
 * @returns Description string
 */
function buildDescription(setting) {
    if (setting.type === 'header' || setting.type === 'paragraph') {
        return '';
    }
    const parts = [setting.label];
    if (setting.info) {
        parts.push(`\n${setting.info}`);
    }
    return parts.join('');
}
// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
/**
 * Extract default values from a Liquid schema
 *
 * @param schema - The Liquid section schema
 * @returns Map of setting ID to default value
 *
 * @example
 * ```typescript
 * const defaults = extractDefaults(schema);
 * // { title: "Hello", columns: 3 }
 * ```
 */
export function extractDefaults(schema) {
    const defaults = {};
    for (const setting of schema.settings) {
        if ('id' in setting &&
            'default' in setting &&
            setting.default !== undefined) {
            defaults[setting.id] = setting.default;
        }
    }
    return defaults;
}
/**
 * Parse a Liquid block definition into a block configuration
 *
 * @param blockSchema - The Liquid block schema
 * @returns Block configuration with ArgTypes and defaults
 *
 * @example
 * ```typescript
 * const blockConfig = parseBlock({
 *   type: "item",
 *   name: "Column Item",
 *   settings: [...]
 * });
 * ```
 */
export function parseBlock(blockSchema) {
    const argTypes = {};
    const defaults = {};
    let currentCategory;
    for (const setting of blockSchema.settings) {
        if (setting.type === 'header') {
            currentCategory = setting.content;
            continue;
        }
        if (setting.type === 'paragraph') {
            continue;
        }
        const argType = parseSetting(setting, currentCategory);
        if (argType && 'id' in setting) {
            argTypes[setting.id] = argType;
            if ('default' in setting && setting.default !== undefined) {
                defaults[setting.id] = setting.default;
            }
        }
    }
    return {
        type: blockSchema.type,
        name: blockSchema.name,
        argTypes,
        defaults,
    };
}
/**
 * Generate a complete Storybook story from a section schema
 *
 * @param sectionName - Name of the section
 * @param schema - The Liquid section schema
 * @returns Storybook story configuration
 *
 * @example
 * ```typescript
 * const story = generateStory("slideshow", schema);
 * // Returns story object ready for Storybook
 * ```
 */
export function generateStory(sectionName, schema) {
    return {
        title: schema.name || sectionName,
        argTypes: parseSchema(schema),
        args: extractDefaults(schema),
    };
}
/**
 * Extract a Liquid schema from a .liquid file contents
 *
 * @param liquidFileContents - Full contents of a .liquid file
 * @returns Parsed schema object or null if not found
 *
 * @example
 * ```typescript
 * const fileContents = fs.readFileSync('sections/slideshow.liquid', 'utf-8');
 * const schema = extractSchemaFromLiquid(fileContents);
 * ```
 */
export function extractSchemaFromLiquid(liquidFileContents) {
    const match = liquidFileContents.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
    if (!match) {
        return null;
    }
    try {
        return JSON.parse(match[1].trim());
    }
    catch (error) {
        console.error('Failed to parse Liquid schema:', error);
        return null;
    }
}
/**
 * Validate that a schema has required fields
 *
 * @param schema - Schema to validate
 * @returns True if valid, false otherwise
 */
export function validateSchema(schema) {
    if (!schema || typeof schema !== 'object') {
        return false;
    }
    if (!schema.name || typeof schema.name !== 'string') {
        return false;
    }
    if (!Array.isArray(schema.settings)) {
        return false;
    }
    return true;
}
// ============================================================================
// EXPORTS
// ============================================================================
export default {
    parseSchema,
    parseSetting,
    extractDefaults,
    parseBlock,
    generateStory,
    extractSchemaFromLiquid,
    validateSchema,
};
