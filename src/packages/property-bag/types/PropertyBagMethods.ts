import { DeclarablePropertyValuesFor } from "./DeclarablePropertyValuesFor";
import { PropertyInfoRecord } from "./PropertyInfoRecord";

export interface PropertyBagMethods<
  Properties extends PropertyInfoRecord<any, any>,
  DeclarationContext
> {
  reset<Name extends keyof Properties>(name: Name): void;

  configure(
    values: Partial<DeclarablePropertyValuesFor<Properties, DeclarationContext>>
  ): this;
}
