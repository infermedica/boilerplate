export const snakeCaseToCamelCase = (s: string) => s.replace(/([-_][a-z])/ig, ($1: string) => $1.toUpperCase()
  .replace('-', '')
  .replace('_', ''));
