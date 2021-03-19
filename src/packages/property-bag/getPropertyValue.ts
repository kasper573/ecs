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
  infos: Properties,
  values: Partial<ResolvablePropertyValuesFor<Properties>>,
  name: Name
): PropertyValueFor<Properties, Name> => {
  const info = infos[name];
  const value = values[name] ?? info.defaultValue;
  return !isType(info.type, ZodTypes.function) && typeof value === "function"
    ? value() // Should resolve
    : value;
};
