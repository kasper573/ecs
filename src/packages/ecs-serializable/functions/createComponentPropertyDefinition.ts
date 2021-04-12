import {
  ComponentPropertyValue,
  ComponentPropertyValueDefinition,
} from "../definition/ComponentPropertiesDefinition";
import { serializeJS } from "../jsSerializer";

export const createComponentPropertyDefinition = (
  value: ComponentPropertyValue
): ComponentPropertyValueDefinition =>
  typeof value === "function" ? { code: serializeJS(value) } : value;
