export function parseJsonToArray(json: string) {
  if (!json || (json && !json?.length)) return [];
  const parsed = JSON.parse(json);

  return Object.keys(parsed);
}
