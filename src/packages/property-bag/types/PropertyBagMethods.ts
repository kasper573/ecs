import { ResolvablePropertyValuesFor } from "./ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./PropertyInfoRecord";

export interface PropertyBagMethods<
  Properties extends PropertyInfoRecord<any, any>
> {
  reset<Name extends keyof Properties>(name: Name): void;

  configure(values: Partial<ResolvablePropertyValuesFor<Properties>>): this;
}
