import { deserializeJS } from "../jsSerializer";
import { ComponentOptions } from "../../ecs/Component";

/**
 * Returns the ComponentOptions for the specified
 * ComponentOptionsDefinition string (or undefined if parsing failed)
 */
export const parseComponentOptions = <Options extends ComponentOptions>(
  definitionAsJson: string
) => {
  try {
    return deserializeJS(definitionAsJson) as Options;
  } catch {}
};
