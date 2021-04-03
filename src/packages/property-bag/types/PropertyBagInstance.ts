import { PropertyBagMethods } from "./PropertyBagMethods";
import { PropertyBag } from "./PropertyBag";
import { PropertyValuesFor } from "./PropertyValuesFor";
import { PropertyInfoRecord } from "./PropertyInfoRecord";

export type PropertyBagInstance<
  Properties extends PropertyInfoRecord<any, any>,
  DeclarationContext
> = PropertyValuesFor<Properties> &
  PropertyBagMethods<Properties, DeclarationContext>;

export type InstanceOf<T extends PropertyBag<any, any>> = T extends new (
  ...args: any[]
) => infer I
  ? I
  : never;
