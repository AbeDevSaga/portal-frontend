import { FormConfig, FieldConfig, FieldGroup, GroupedFields } from "@/common/types/formType";

/**
 * Dynamically generates groupMap and allFields from formConfig
 * This eliminates the need for hardcoded grouping in individual pages
 */
export function generateFieldGrouping(config: FormConfig) {
    const allFields: { key: string; label: string; type: string }[] = [];
    const groupMap: Record<string, string> = {};
    const groupedFields: GroupedFields = {};

    // Extract all fields from all steps
    config.steps.forEach((step) => {
        step.fields.forEach((field) => {
            // Add to allFields array
            allFields.push({
                key: field.key,
                label: field.label,
                type: field.type,
            });

            // Determine group for this field
            let groupName = field.group || step.group || config.grouping?.defaultGroup || step.title;

            // If no explicit group, use step title as fallback
            if (!groupName) {
                groupName = step.title;
            }

            // Add to groupMap
            groupMap[field.key] = groupName;

            // Add to groupedFields for advanced grouping
            if (!groupedFields[groupName]) {
                groupedFields[groupName] = {
                    name: groupName,
                    label: groupName,
                    order: step.groupOrder || 0,
                    fields: [],
                };
            }

            // Add field to its group
            groupedFields[groupName].fields.push(field);
        });
    });

    // Sort groups by order if specified
    if (config.grouping?.groups) {
        const sortedGroups: GroupedFields = {};
        config.grouping.groups
            .sort((a, b) => a.order - b.order)
            .forEach((group) => {
                if (groupedFields[group.name]) {
                    sortedGroups[group.name] = groupedFields[group.name];
                }
            });
        Object.assign(groupedFields, sortedGroups);
    }

    return {
        allFields,
        groupMap,
        groupedFields,
    };
}

/**
 * Generates a more sophisticated grouping with custom labels and ordering
 */
export function generateAdvancedFieldGrouping(config: FormConfig) {
    const { allFields, groupMap, groupedFields } = generateFieldGrouping(config);

    // If custom groups are defined in config, use them
    if (config.grouping?.groups) {
        const customGroupMap: Record<string, string> = {};
        const customAllFields: { key: string; label: string; type: string }[] = [];

        config.grouping.groups.forEach((group) => {
            // Find all fields that belong to this group
            const groupFields = config.steps
                .flatMap((step) => step.fields.map(field => ({ ...field, stepGroup: step.group })))
                .filter((field) => {
                    const fieldGroup = field.group || field.stepGroup || group.name;
                    return fieldGroup === group.name;
                });

            // Add fields to custom grouping
            groupFields.forEach((field) => {
                customGroupMap[field.key] = group.label;
                customAllFields.push({
                    key: field.key,
                    label: field.label,
                    type: field.type,
                });
            });
        });

        return {
            allFields: customAllFields,
            groupMap: customGroupMap,
            groupedFields,
        };
    }

    return { allFields, groupMap, groupedFields };
}

/**
 * Generates step-based grouping (each step is a group)
 */
export function generateStepBasedGrouping(config: FormConfig) {
    const allFields: { key: string; label: string }[] = [];
    const groupMap: Record<string, string> = {};

    config.steps.forEach((step) => {
        step.fields.forEach((field) => {
            allFields.push({
                key: field.key,
                label: field.label,
            });
            groupMap[field.key] = step.title;
        });
    });

    return { allFields, groupMap };
}

/**
 * Generates automatic grouping based on field types or patterns
 */
export function generateAutomaticGrouping(config: FormConfig) {
    const allFields: { key: string; label: string }[] = [];
    const groupMap: Record<string, string> = {};

    // Define automatic grouping rules
    const groupingRules: Record<string, string[]> = {
        "Personal Information": [
            "firstName", "lastName", "name", "fullName", "dateOfBirth", "birthDate",
            "gender", "sex", "age", "nationality", "citizenship"
        ],
        "Contact Information": [
            "email", "phone", "telephone", "mobile", "address", "city", "state",
            "country", "postalCode", "zipCode"
        ],
        "Location Details": [
            "placeOfBirth", "birthPlace", "region", "zone", "woreda", "kebele",
            "district", "province", "municipality"
        ],
        "Family Information": [
            "fatherName", "fathersName", "motherName", "mothersName", "parentName",
            "guardianName", "spouseName", "siblingName"
        ],
        "Document Information": [
            "idNumber", "passportNumber", "documentNumber", "certificateNumber",
            "file", "document", "resume", "attachment"
        ],
        "Additional Details": [
            "notes", "comments", "description", "details", "remarks", "textarea"
        ],
    };

    config.steps.forEach((step) => {
        step.fields.forEach((field) => {
            allFields.push({
                key: field.key,
                label: field.label,
            });

            // Find the best matching group
            let bestGroup = "Other";
            let bestMatch = 0;

            Object.entries(groupingRules).forEach(([groupName, patterns]) => {
                patterns.forEach((pattern) => {
                    if (field.key.toLowerCase().includes(pattern.toLowerCase()) ||
                        field.label.toLowerCase().includes(pattern.toLowerCase())) {
                        bestGroup = groupName;
                        bestMatch = 1;
                    }
                });
            });

            groupMap[field.key] = bestGroup;
        });
    });

    return { allFields, groupMap };
}
