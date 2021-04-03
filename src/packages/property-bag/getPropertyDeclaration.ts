import { ResolvablePropertyValuesFor } from "./types/ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";
import { PropertyValueFor } from "./types/PropertyValueFor";
import { PropertyDeclarationContext } from "./types/PropertyDeclarationContext";

export const getPropertyDeclaration = <
  Properties extends PropertyInfoRecord<any, Types>,
  Name extends keyof Properties,
  Types
>(
  values: Partial<ResolvablePropertyValuesFor<Properties>>,
  info: Properties[Name],
  name: Name
) =>
  values[name] as (
    context: PropertyDeclarationContext
  ) => PropertyValueFor<Properties, Name>;
