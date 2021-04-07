export function getEntityDisplayName(
  initializerName: string,
  definitionName?: string
) {
  if (definitionName && definitionName !== initializerName) {
    return `${initializerName} (${definitionName})`;
  }
  return initializerName;
}
