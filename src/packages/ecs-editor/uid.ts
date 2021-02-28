let idCounter = 0;

export const uid = <T extends string>() => `uid${idCounter++}` as T;
