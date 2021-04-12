import { PropertyInfoRecord } from "./PropertyInfoRecord";

export type PropertyValueFor<
  T extends PropertyInfoRecord<any, any>,
  Name extends keyof T
> = T[Name]["type"]["_type"];
