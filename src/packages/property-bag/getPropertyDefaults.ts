import { keys } from "../ecs-common/nominal";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";
import { PropertyValuesFor } from "./types/PropertyValuesFor";

export const getPropertyDefaults = <
  Properties extends PropertyInfoRecord<any, any>
>(
  infos: Properties
) => {
  const defaults = {} as PropertyValuesFor<Properties>;
  keys(infos).forEach(<K extends keyof Properties>(key: K) => {
    defaults[key] = infos[key].defaultValue;
  });
  return defaults;
};
