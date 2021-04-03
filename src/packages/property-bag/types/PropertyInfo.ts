import { ZodType, ZodTypeDef } from "zod";
import { IfContains } from "./IfContains";

export type PropertyInfo<
  Type,
  Definition extends ZodTypeDef = ZodTypeDef
> = IfContains<
  Type,
  undefined,
  PropertyInfoBase<Type, Definition> & { defaultValue?: Type },
  PropertyInfoBase<Type, Definition> & { defaultValue: Type }
>;

type PropertyInfoBase<Type, Definition extends ZodTypeDef = ZodTypeDef> = {
  type: ZodType<Type, Definition>;
  hidden?: boolean;
};
