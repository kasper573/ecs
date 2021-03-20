import { ZodTypes } from "zod";
import { isType } from "./isType";
import { PropertyValueFor } from "./types/PropertyValueFor";
import { ResolvablePropertyValuesFor } from "./types/ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";

export const getPropertyValue = <
  Properties extends PropertyInfoRecord<any, Types>,
  Name extends keyof Properties,
  Types
>(
  values: Partial<ResolvablePropertyValuesFor<Properties>>,
  info: Properties[Name],
  name: Name,
  defaultValue = info.defaultValue
): PropertyValueFor<Properties, Name> => {
  const value = values.hasOwnProperty(name) ? values[name] : defaultValue;
  return !isType(info.type, ZodTypes.function) && typeof value === "function"
    ? (value as Function)() // Should resolve
    : value;
};
