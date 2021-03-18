export type PrimitiveName = keyof PrimitiveTypes;

export type PrimitiveTypes = {
  boolean: boolean;
  string: string;
  number: number;
  function: Function;
};

export type PrimitiveType = PrimitiveTypes[PrimitiveName];
