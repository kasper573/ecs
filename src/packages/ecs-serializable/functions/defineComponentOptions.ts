import { ComponentOptionsDefinition } from "../types/ComponentOptionsDefinition";
import { deserializeJS } from "../jsSerializer";
import { ComponentOptions } from "../../ecs/Component";

/**
 * Returns the ComponentOptions for the specified ComponentOptionsDefinition
 */
export const defineComponentOptions = <Options extends ComponentOptions>(
  options: ComponentOptionsDefinition
) => deserializeJS(options) as Options;
