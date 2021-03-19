import { Resolvable } from "./Resolvable";
import { PropertyValueFor } from "./PropertyValueFor";
import { PropertyInfoRecord } from "./PropertyInfoRecord";

export type ResolvablePropertyValuesFor<T> = T extends PropertyInfoRecord<
  infer Names,
  any
>
  ? {
      readonly [K in Names]: Resolvable<PropertyValueFor<T, K>>;
    }
  : never;
