import {
  ComponentPropertyValue,
  ComponentPropertyValueDefinition,
} from "../definition/ComponentPropertiesDefinition";
import { deserializeJS } from "../jsSerializer";
import { isFunctionDefinition } from "./isFunctionDefinition";

export const createComponentProperty = (
  value: ComponentPropertyValueDefinition
): ComponentPropertyValue =>
  isFunctionDefinition(value) ? deserializeJS(value.code) : value;
