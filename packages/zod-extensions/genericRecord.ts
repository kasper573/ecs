import * as zod from "zod";
import * as z from "zod/lib/src/types/base";
import { GenericZodString } from "./genericString";

export const genericRecord = <KeyType extends string, ValueType>(
  keyType: GenericZodString<KeyType>,
  valueType: z.ZodType<ValueType>
) =>
  (zod.record(valueType) as unknown) as z.ZodType<Record<KeyType, ValueType>>;
