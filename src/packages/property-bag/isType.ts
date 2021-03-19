import { ZodType, ZodTypes } from "zod";
import { ZodUnionDef } from "zod/lib/src/types/union";

/**
 * Checks if the specified ZodType instance is of the desired ZodTypes value
 */
export const isType = (type: ZodType<any>, search: ZodTypes) => {
  const def = type._def;
  if (def.t === search) {
    return true;
  }
  if (def.t === ZodTypes.union) {
    const { options } = def as ZodUnionDef;
    return !!options.find((d) => d._def.t === search);
  }
  return false;
};
