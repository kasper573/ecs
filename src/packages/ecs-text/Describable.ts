import { Derive, Component, ComponentOptions } from "../ecs/Component";
import { Entity } from "../ecs/Entity";
import { World } from "../ecs/World";

export class Describable extends Component {
  public readonly describe: DescribableComponentOptions["describe"];

  isActive(entity: Entity, world: World) {
    const isInInventory = world.inventory.includes(entity);
    return !isInInventory && super.isActive(entity, world);
  }

  constructor(options: DescribableComponentOptions) {
    super(options);
    this.describe = options.describe;
  }
}

export type DescribableComponentOptions = ComponentOptions & {
  describe: Derive<string>;
};
