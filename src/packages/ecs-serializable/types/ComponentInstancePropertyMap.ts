import { ComponentInitializerId } from "./ComponentInitializer";
import { ComponentPropertiesDefinition } from "./ComponentPropertiesDefinition";

export type ComponentInstancePropertyMap = Map<
  ComponentInitializerId,
  {
    base?: ComponentPropertiesDefinition;
    primary?: ComponentPropertiesDefinition;
  }
>;
