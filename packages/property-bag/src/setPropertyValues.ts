import { DeclarablePropertyValuesFor } from "./types/DeclarablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";

export const setPropertyValues = <
  Properties extends PropertyInfoRecord<any, any>,
  DeclarationContext
>(
  values: Partial<DeclarablePropertyValuesFor<Properties, DeclarationContext>>,
  updates: Partial<DeclarablePropertyValuesFor<Properties, DeclarationContext>>
): void => {
  Object.assign(values, updates);
};
