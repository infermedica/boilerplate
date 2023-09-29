export const camelCaseToSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, letter => {
    return `_${letter.toLowerCase()}`
  });
}
