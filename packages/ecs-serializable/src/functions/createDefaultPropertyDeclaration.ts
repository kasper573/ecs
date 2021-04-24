import {
  ComponentPropertyFunction,
  ComponentPropertyPrimitive,
} from "../definition/ComponentPropertiesDefinition";

export const createDefaultPropertyDeclaration = <
  T extends ComponentPropertyPrimitive
>(
  defaultValue: T
): ComponentPropertyFunction => {
  // eslint-disable-next-line no-eval
  return eval(`() => ${JSON.stringify(defaultValue)}`);
};
