import { ResolvablePropertyValuesFor } from "./types/ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";
import { PropertyValueFor } from "./types/PropertyValueFor";

export const getPropertyDeclaration = <
  Properties extends PropertyInfoRecord<any, Types>,
  Name extends keyof Properties,
  Types
>(
  values: Partial<ResolvablePropertyValuesFor<Properties>>,
  info: Properties[Name],
  name: Name
) => values[name] as () => PropertyValueFor<Properties, Name>;
