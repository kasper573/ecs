import {
  ComponentPropertiesDefinition,
  ComponentPropertyValueDefinition,
} from "../types/ComponentPropertiesDefinition";

/**
 * Updates a specific option
 */
export const updateComponentPropertiesDefinition = (
  definition: ComponentPropertiesDefinition,
  optionName: string,
  optionValue: ComponentPropertyValueDefinition
): ComponentPropertiesDefinition => ({
  ...definition,
  [optionName]: optionValue,
});
