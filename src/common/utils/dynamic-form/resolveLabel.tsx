// Utility to resolve label whether it's a string or a function
export const resolveLabel = (
  label: string | ((values: any) => string),
  values: any
) => {
  if (typeof label === "function") {
    return label(values);
  }
  return label;
};
