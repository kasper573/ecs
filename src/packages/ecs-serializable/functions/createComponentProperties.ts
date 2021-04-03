import {
  ComponentProperties,
  ComponentPropertiesDefinition,
} from "../types/ComponentPropertiesDefinition";
import { createComponentProperty } from "./createComponentProperty";

/**
 * Returns the props object for the specified ComponentOptionsDefinition
 */
export const createComponentProperties = <
  Properties extends ComponentProperties
>(
  definition: ComponentPropertiesDefinition
) =>
  Object.keys(definition).reduce(
    (properties, propertyName) => ({
      ...properties,
      [propertyName]: createComponentProperty(definition[propertyName]),
    }),
    {} as Properties
  );
