import {
  ComponentPropertyValue,
  ComponentPropertyValueDefinition,
} from "../definition/ComponentPropertiesDefinition";
import { deserializeJS } from "../jsSerializer";
import { isECSScript } from "./isECSScript";

export const createComponentProperty = (
  value: ComponentPropertyValueDefinition
): ComponentPropertyValue =>
  isECSScript(value) ? deserializeJS(value.code) : value;
