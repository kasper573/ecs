import { PropertyValueFor } from "./PropertyValueFor";
import { PropertyInfoRecord } from "./PropertyInfoRecord";

export type PropertyValuesFor<T> = T extends PropertyInfoRecord<
  infer Names,
  any
>
  ? {
      readonly [K in Names]: PropertyValueFor<T, K>;
    }
  : never;
