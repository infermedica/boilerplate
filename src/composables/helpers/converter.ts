import { snakeCaseToCamelCase, camelCaseToSnakeCase } from '@/composables/helpers';

export function convertResponse(response: { [key: string]: any; }) {
  let parentKeys = Object.keys(response);
  parentKeys.forEach((key) => {
    let currentObj = response[key];
    delete response[key];
    let newKey = snakeCaseToCamelCase(key);
    response[newKey] = currentObj;
    if (typeof response[newKey] === "object") {
      convertResponse(response[newKey]);
    }
  });
  return response;
}
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
