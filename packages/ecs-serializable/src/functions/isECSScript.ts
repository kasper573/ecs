import { ComponentPropertyValueDefinition } from "../definition/ComponentPropertiesDefinition";
import { ECSScript } from "../definition/ECSScript";

export const isECSScript = (
  value: ComponentPropertyValueDefinition
): value is ECSScript => typeof value === "object" && !Array.isArray(value);
