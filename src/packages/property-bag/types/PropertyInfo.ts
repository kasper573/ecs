import { ZodType, ZodTypeDef } from "zod";

export type PropertyInfo<Type, Definition extends ZodTypeDef = ZodTypeDef> = {
  type: ZodType<Type, Definition>;
  defaultValue: Type;
  hidden?: boolean;
};
