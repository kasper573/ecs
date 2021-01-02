import { Derive, Component, ComponentOptions } from "../types/Component";
import { Entity } from "../types/Entity";
import { World } from "../types/World";

export class Observable extends Component {
  public readonly observe: ObservableComponentOptions["observe"];

  isActive(entity: Entity, world: World) {
    const isInInventory = world.inventory.includes(entity);
    return !isInInventory && super.isActive(entity, world);
  }

  constructor(options: ObservableComponentOptions) {
    super(options);
    this.observe = options.observe;
  }
}

export type ObservableComponentOptions = ComponentOptions & {
  observe: Derive<string>;
};
