import { ComponentOptionsDefinition } from "../types/ComponentOptionsDefinition";
import { deserializeJS } from "../jsSerializer";
import { ComponentOptions } from "../../ecs/Component";

/**
 * Returns the ComponentOptions for the specified ComponentOptionsDefinition
 */
export const createComponentOptions = <Options extends ComponentOptions>(
  definition: ComponentOptionsDefinition
) => deserializeJS(definition) as Options;
