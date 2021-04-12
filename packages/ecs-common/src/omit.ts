import { omit as lodashOmit } from "lodash";

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) => lodashOmit(obj, keys);
