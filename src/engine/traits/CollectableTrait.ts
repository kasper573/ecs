import { Trait } from "../types/Trait";
import { Entity } from "../types/Entity";
import { World } from "../types/World";
import { removeItem } from "../functions/removeItem";

export class CollectableTrait extends Trait {
  isActive(entity: Entity, world: World) {
    return !world.inventory.includes(entity);
  }

  apply(entity: Entity, world: World) {
    world.inventory.push(entity);
    removeItem(world.scene, entity);
    return {
      description: `Picked up ${entity.name}.`,
    };
  }

  action(entity: Entity): string {
    return `Pick up ${entity.name}`;
  }
}
