export function getStringParam(params: URLSearchParams, key: string) {
  const value = params.get(key);
  return value !== null ? value.trim() : undefined;
}
