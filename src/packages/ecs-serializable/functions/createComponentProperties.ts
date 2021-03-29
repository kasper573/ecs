import { ComponentPropertiesDefinition } from "../types/ComponentPropertiesDefinition";
import { deserializeJS } from "../jsSerializer";

/**
 * Returns the props object for the specified ComponentOptionsDefinition
 */
export const createComponentProperties = <
  Options extends Record<string, unknown>
>(
  definition: ComponentPropertiesDefinition
) => deserializeJS(definition) as Options;
