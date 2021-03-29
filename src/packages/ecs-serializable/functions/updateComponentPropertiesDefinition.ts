import { ComponentPropertiesDefinition } from "../types/ComponentPropertiesDefinition";
import { createComponentProperties } from "./createComponentProperties";
import { createComponentPropertiesDefinition } from "./createComponentPropertiesDefinition";

/**
 * Updates a specific option
 */
export const updateComponentPropertiesDefinition = (
  definition: ComponentPropertiesDefinition,
  optionName: string,
  optionValue: unknown
) => {
  const props = createComponentProperties<{}>(definition);
  const updatedOptions = { ...props, [optionName]: optionValue };
  return createComponentPropertiesDefinition(updatedOptions);
};
