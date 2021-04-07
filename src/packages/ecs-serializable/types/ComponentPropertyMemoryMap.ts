import { ComponentInitializerId } from "./ComponentInitializer";
import { ComponentPropertiesDefinition } from "./ComponentPropertiesDefinition";
import { EntityInitializerId } from "./EntityInitializer";

export class ComponentPropertyMemoryMap extends Map<
  EntityInitializerId,
  Map<ComponentInitializerId, ComponentPropertyMemory>
> {
  pull(entityId: EntityInitializerId, componentId: ComponentInitializerId) {
    let components = this.get(entityId);
    if (!components) {
      components = new Map<ComponentInitializerId, ComponentPropertyMemory>();
      this.set(entityId, components);
    }
    return components.get(componentId);
  }

  push(
    entityId: EntityInitializerId,
    componentId: ComponentInitializerId,
    props: ComponentPropertyMemory
  ) {
    let components = this.get(entityId);
    if (!components) {
      components = new Map<ComponentInitializerId, ComponentPropertyMemory>();
      this.set(entityId, components);
    }
    return components.set(componentId, props);
  }
}

export type ComponentPropertyMemory = {
  base?: ComponentPropertiesDefinition;
  primary?: ComponentPropertiesDefinition;
};
