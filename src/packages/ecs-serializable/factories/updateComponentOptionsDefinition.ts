import { ComponentOptionsDefinition } from "../types/ComponentOptionsDefinition";
import { ComponentOptions } from "../../ecs/Component";
import { createComponentOptions } from "./createComponentOptions";
import { createComponentOptionsDefinition } from "./createComponentOptionsDefinition";

/**
 * Updates a specific option
 */
export const updateComponentOptionsDefinition = <
  Options extends ComponentOptions,
  Name extends keyof Options
>(
  definition: ComponentOptionsDefinition,
  optionName: Name,
  optionValue: Options[Name]
) => {
  const options = createComponentOptions<Options>(definition);
  const updatedOptions: Options = { ...options, [optionName]: optionValue };
  return createComponentOptionsDefinition(updatedOptions);
};
