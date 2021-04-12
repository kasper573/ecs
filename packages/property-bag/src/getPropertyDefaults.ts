import { typedKeys } from "../../ecs-common/src/typedKeys";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";
import { PropertyValuesFor } from "./types/PropertyValuesFor";

export const getPropertyDefaults = <
  Properties extends PropertyInfoRecord<any, any>
>(
  infos: Properties
) => {
  const defaults = {} as PropertyValuesFor<Properties>;
  typedKeys(infos).forEach(<K extends keyof Properties>(key: K) => {
    defaults[key] = infos[key].defaultValue;
  });
  return defaults;
};
