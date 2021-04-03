import { DeclarablePropertyValuesFor } from "./types/DeclarablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";

export const resetPropertyValue = <
  Properties extends PropertyInfoRecord<any, any>,
  Name extends keyof Properties,
  DeclarationContext
>(
  values: Partial<DeclarablePropertyValuesFor<Properties, DeclarationContext>>,
  info: Properties[Name],
  name: Name
) => {
  delete values[name];
};
