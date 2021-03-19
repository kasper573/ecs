import { ZodTypeDef } from "zod";
import { PropertyInfo } from "./PropertyInfo";

export type PropertyInfoRecord<
  Names extends keyof any,
  Types,
  Definitions extends ZodTypeDef = ZodTypeDef
> = Record<Names, PropertyInfo<Types, Definitions>>;
