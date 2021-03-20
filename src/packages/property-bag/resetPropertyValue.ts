import { ResolvablePropertyValuesFor } from "./types/ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";

export const resetPropertyValue = <
  Properties extends PropertyInfoRecord<any, any>,
  Name extends keyof Properties
>(
  values: Partial<ResolvablePropertyValuesFor<Properties>>,
  info: Properties[Name],
  name: Name
) => {
  delete values[name];
};
