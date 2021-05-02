import { ZodTypeDef } from "zod/lib/src/types/base";
import { ZodType } from "zod";

export function saveZodToLS<Type, Def extends ZodTypeDef = ZodTypeDef>(
  storageKey: string,
  schema: ZodType<Type, Def>,
  value: Type
) {
  localStorage.setItem(storageKey, JSON.stringify(value));
}

export function loadZodFromLS<Type, Def extends ZodTypeDef = ZodTypeDef>(
  storageKey: string,
  schema: ZodType<Type, Def>
) {
  const jsonString = localStorage.getItem(storageKey) as string | undefined;
  try {
    return jsonString ? schema.parse(JSON.parse(jsonString)) : undefined;
  } catch {}
}
