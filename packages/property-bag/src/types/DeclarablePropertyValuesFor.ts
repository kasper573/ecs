import { Declarable } from "./Declarable";
import { PropertyValueFor } from "./PropertyValueFor";
import { PropertyInfoRecord } from "./PropertyInfoRecord";

export type DeclarablePropertyValuesFor<
  T,
  DeclarationContext
> = T extends PropertyInfoRecord<infer Names, any>
  ? {
      readonly [K in Names]: Declarable<
        PropertyValueFor<T, K>,
        DeclarationContext
      >;
    }
  : never;
