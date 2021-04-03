import { propertySupportsDeclarative } from "./propertySupportsDeclarative";
import { DeclarablePropertyValuesFor } from "./types/DeclarablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";

export const isPropertyDeclarative = <
  Properties extends PropertyInfoRecord<any, Types>,
  Name extends keyof Properties,
  Types,
  DeclarationContext
>(
  values: Partial<DeclarablePropertyValuesFor<Properties, DeclarationContext>>,
  info: Properties[Name],
  name: Name
) => propertySupportsDeclarative(info) && typeof values[name] === "function";
