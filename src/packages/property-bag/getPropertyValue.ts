import { PropertyValueFor } from "./types/PropertyValueFor";
import { ResolvablePropertyValuesFor } from "./types/ResolvablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";
import { isPropertyDeclarative } from "./isPropertyDeclarative";
import { getPropertyDeclaration } from "./getPropertyDeclaration";

export const getPropertyValue = <
  Properties extends PropertyInfoRecord<any, Types>,
  Name extends keyof Properties,
  Types
>(
  values: Partial<ResolvablePropertyValuesFor<Properties>>,
  info: Properties[Name],
  name: Name,
  defaultValue = info.defaultValue
): PropertyValueFor<Properties, Name> => {
  if (isPropertyDeclarative(values, info, name)) {
    const declaration = getPropertyDeclaration(values, info, name);

    try {
      return declaration();
    } catch (e) {
      console.error(
        `Error while resolving declarative property "${name}": "${e.message}"`
      );
      return defaultValue;
    }
  }
  return values.hasOwnProperty(name)
    ? (values[name] as PropertyValueFor<Properties, Name>)
    : defaultValue;
};
