import { ResolvablePropertyValuesFor } from "./types/ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";

export const resetPropertyValue = <
  Properties extends PropertyInfoRecord<any, any>,
  Name extends keyof Properties
>(
  infos: Properties,
  values: Partial<ResolvablePropertyValuesFor<Properties>>,
  name: Name
) => {
  values[name] = infos[name].defaultValue;
};
