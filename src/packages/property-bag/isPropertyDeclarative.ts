import { propertySupportsDeclarative } from "./propertySupportsDeclarative";
import { ResolvablePropertyValuesFor } from "./types/ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";

export const isPropertyDeclarative = <
  Properties extends PropertyInfoRecord<any, Types>,
  Name extends keyof Properties,
  Types
>(
  values: Partial<ResolvablePropertyValuesFor<Properties>>,
  info: Properties[Name],
  name: Name
) => propertySupportsDeclarative(info) && typeof values[name] === "function";
