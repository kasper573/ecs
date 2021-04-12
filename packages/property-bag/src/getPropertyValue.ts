import { PropertyValueFor } from "./types/PropertyValueFor";
import { DeclarablePropertyValuesFor } from "./types/DeclarablePropertyValuesFor";
import { PropertyInfoRecord } from "./types/PropertyInfoRecord";
import { isPropertyDeclarative } from "./isPropertyDeclarative";
import { getPropertyDeclaration } from "./getPropertyDeclaration";

export const getPropertyValue = <
  Properties extends PropertyInfoRecord<any, Types>,
  Name extends keyof Properties,
  Types,
  DeclarationContext
>(
  values: Partial<DeclarablePropertyValuesFor<Properties, DeclarationContext>>,
  info: Properties[Name],
  name: Name,
  context: DeclarationContext,
  defaultValue = info.defaultValue
): PropertyValueFor<Properties, Name> => {
  if (isPropertyDeclarative(values, info, name)) {
    const declaration = getPropertyDeclaration(values, info, name);

    try {
      return declaration(context);
    } catch (e) {
      console.error(
        `Error while resolving declarative property "${name}": "${e.message}"`
      );
      return defaultValue as PropertyValueFor<Properties, Name>;
    }
  }
  return values.hasOwnProperty(name)
    ? (values[name] as PropertyValueFor<Properties, Name>)
    : (defaultValue as PropertyValueFor<Properties, Name>);
};
