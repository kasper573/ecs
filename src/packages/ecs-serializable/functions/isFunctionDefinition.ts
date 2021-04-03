import {
  ComponentPropertyFunctionDefinition,
  ComponentPropertyValueDefinition,
} from "../types/ComponentPropertiesDefinition";

export const isFunctionDefinition = (
  value: ComponentPropertyValueDefinition
): value is ComponentPropertyFunctionDefinition =>
  typeof value === "object" && !Array.isArray(value);
