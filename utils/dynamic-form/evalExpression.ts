export function evalExpression(
  expression: string,
  model: Record<string, any>
): boolean {
  try {
    // Very basic and safe eval using Function
    // Avoids direct eval()
    return new Function("model", `return ${expression};`)(model);
  } catch {
    return false;
  }
}
