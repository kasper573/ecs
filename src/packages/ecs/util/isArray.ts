// Taken from https://github.com/microsoft/TypeScript/pull/39258

export function isArray<T>(
  arg: T | {}
): arg is T extends readonly any[]
  ? unknown extends T
    ? never
    : readonly any[]
  : any[] {
  return Array.isArray(arg);
}
