import {
  FormConfig,
  FieldConfig,
  FieldGroup,
  GroupedFields,
} from "@/common/types/formType";

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
      const defaultGroup =
        Array.isArray(config.grouping) && config.grouping.length > 0
          ? config.grouping[0].defaultGroup
          : undefined;

      let groupName = field.group || step.group || defaultGroup || step.title;

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
  // if (Array.isArray(config.grouping) && config.grouping.length > 0) {
  //     const sortedGroups: GroupedFields = {};
  //     config.grouping
  //         .sort((a, b) => (a.order || 0) - (b.order || 0))
  //         .forEach((group) => {
  //             if (groupedFields[group.name]) {
  //                 sortedGroups[group.name] = groupedFields[group.name];
  //             }
  //         });
  //     Object.assign(groupedFields, sortedGroups);
  // }

  return {
    allFields,
    groupMap,
    groupedFields,
  };
}

// The rest of your functions can stay the same.
