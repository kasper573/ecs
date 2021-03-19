import { ResolvablePropertyValuesFor } from "./types/ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";

export const setPropertyValues = <
  Properties extends PropertyInfoRecord<any, any>
>(
  values: Partial<ResolvablePropertyValuesFor<Properties>>,
  updates: Partial<ResolvablePropertyValuesFor<Properties>>
): void => {
  Object.assign(values, updates);
};
