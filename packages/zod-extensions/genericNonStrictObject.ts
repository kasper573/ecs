import * as zod from "zod";
import * as z from "zod/lib/src/types/base";

export const genericNonStrictObject = <T extends object>() =>
  (zod.object({}).nonstrict() as unknown) as z.ZodType<T>;
