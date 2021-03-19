import { serializeJS } from "../jsSerializer";
import { ComponentPropertiesDefinition } from "../types/ComponentPropertiesDefinition";

export const createComponentPropertiesDefinition = (
  props: Record<string, unknown>
) => serializeJS(props) as ComponentPropertiesDefinition;
