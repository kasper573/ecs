import { Resolvable } from "./types/Resolvable";
import { PropertyValueFor } from "./types/PropertyValueFor";
import { ResolvablePropertyValuesFor } from "./types/ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";

export const setPropertyValue = <
  Properties extends PropertyInfoRecord<any, any>,
  Name extends keyof Properties
>(
  values: Partial<ResolvablePropertyValuesFor<Properties>>,
  name: Name,
  value: Resolvable<PropertyValueFor<Properties, Name>>
): void => (values[name] = value);
