import * as zod from "zod";
import * as z from "zod/lib/src/types/base";
import { ZodStringDef } from "zod/lib/src/types/string";

export const genericString = <T extends string>() =>
  (zod.string() as unknown) as GenericZodString<T>;

export type GenericZodString<T extends string> = z.ZodType<T, ZodStringDef>;
