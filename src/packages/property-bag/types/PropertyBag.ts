import { PropertyBagInstance } from "./PropertyBagInstance";
import { DeclarablePropertyValuesFor } from "./DeclarablePropertyValuesFor";
import { PropertyInfoRecord } from "./PropertyInfoRecord";

export type PropertyBag<
  Properties extends PropertyInfoRecord<string, unknown>,
  DeclarationContext
> = {
  new (
    values?: Partial<
      DeclarablePropertyValuesFor<Properties, DeclarationContext>
    >
  ): PropertyBagInstance<Properties, DeclarationContext>;
  propertyInfos: Properties;
  displayName: string;
  extend<ExtensionProperties extends PropertyInfoRecord<any, any>>(
    extensionProperties: ExtensionProperties,
    extensionName?: string
  ): PropertyBag<ExtensionProperties & Properties, DeclarationContext>;
};
