import { snakeCaseToCamelCase, camelCaseToSnakeCase } from '@/composables/helpers';

export const convertResponse = (item: unknown): unknown => {
  if (Array.isArray(item)) {
    return item.map(el => convertResponse(el));
  } else if (typeof item === 'function' || item !== Object(item)) {
    return item;
  }
  return Object.fromEntries(
    Object.entries(item as Record<string, unknown>).map(([key, value]) => [
      snakeCaseToCamelCase(key),
      convertResponse(value),
    ]),
  );
};

export function convertRequest(request: { [key: string]: any; }) {
  let parentKeys = Object.keys(request);
  parentKeys.forEach((key) => {
    let currentObj = request[key];
    delete request[key];
    let newKey = camelCaseToSnakeCase(key);
    request[newKey] = currentObj;
    if (typeof request[newKey] === "object") {
      convertRequest(request[newKey]);
    }
  });
  return request;
}
