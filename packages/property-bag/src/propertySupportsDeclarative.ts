import { ZodTypes } from "zod";
import { isType } from "./isType";
import { PropertyInfo } from "./types/PropertyInfo";

export const propertySupportsDeclarative = (info: PropertyInfo<any>) =>
  !isType(info.type, ZodTypes.function);
