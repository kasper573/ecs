import {
  ComponentPropertyValue,
  ComponentPropertyValueDefinition,
} from "../types/ComponentPropertiesDefinition";
import { serializeJS } from "../jsSerializer";

export const createComponentPropertyDefinition = (
  value: ComponentPropertyValue
): ComponentPropertyValueDefinition =>
  typeof value === "function" ? { code: serializeJS(value) } : value;
