import {
  snakeCaseToCamelCase,
  camelCaseToSnakeCase,
} from '@/services/helpers';

export const convertResponse = (item: unknown): unknown => {
  if (Array.isArray(item)) {
    return item.map((el) => convertResponse(el));
  } if (typeof item === 'function' || item !== Object(item)) {
    return item;
  }
  return Object.fromEntries(
    Object.entries(item as Record<string, unknown>).map(([
      key, value,
    ]) => [
      snakeCaseToCamelCase(key),
      convertResponse(value),
    ]),
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertRequest(request: { [key: string]: any }) {
  const parentKeys = Object.keys(request);
  parentKeys.forEach((key) => {
    const currentObj = request[key];
    delete request[key];
    const newKey = camelCaseToSnakeCase(key);
    request[newKey] = currentObj;
    if (typeof request[newKey] === 'object') {
      convertRequest(request[newKey]);
    }
  });
  return request;
}
