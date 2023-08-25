export const snakeCaseToCamelCase = (s: string) => {
  return s.replace(/([-_][a-z])/ig, ($1: string) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};
