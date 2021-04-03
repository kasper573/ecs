import { ComponentInitializerId } from "./ComponentInitializer";
import { ComponentPropertiesDefinition } from "./ComponentPropertiesDefinition";
import { EntityInitializerId } from "./EntityInitializer";

export type ComponentInstanceId = Nominal<string, "ComponentInstanceId">;

export type ComponentInstancePropertyMap = Map<
  ComponentInstanceId,
  {
    base?: ComponentPropertiesDefinition;
    primary?: ComponentPropertiesDefinition;
  }
>;

export const getComponentInstanceId = (
  entityId: EntityInitializerId,
  componentId: ComponentInitializerId
) => `${entityId}+${componentId}` as ComponentInstanceId;
