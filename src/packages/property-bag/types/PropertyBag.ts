import { PropertyBagInstance } from "./PropertyBagInstance";
import { ResolvablePropertyValuesFor } from "./ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./PropertyInfoRecord";

export type PropertyBag<
  Properties extends PropertyInfoRecord<string, unknown>
> = {
  new (
    values?: Partial<ResolvablePropertyValuesFor<Properties>>
  ): PropertyBagInstance<Properties>;
  propertyInfos: Properties;
  displayName: string;
  extend<ExtensionProperties extends PropertyInfoRecord<any, any>>(
    extensionProperties: ExtensionProperties,
    extensionName?: string
  ): PropertyBag<ExtensionProperties & Properties>;
};
