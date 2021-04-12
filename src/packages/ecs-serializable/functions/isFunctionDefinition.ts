import {
  ComponentPropertyFunctionDefinition,
  ComponentPropertyValueDefinition,
} from "../definition/ComponentPropertiesDefinition";

export const isFunctionDefinition = (
  value: ComponentPropertyValueDefinition
): value is ComponentPropertyFunctionDefinition =>
  typeof value === "object" && !Array.isArray(value);
