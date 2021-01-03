import { Entity } from "../ecs/Entity";
import { Describable as TextDescribable } from "../ecs-text/Describable";
import { World } from "../ecs/World";
import { HasInventory } from "./HasInventory";

/**
 * Inventory items should not be described in the world
 */
export class Describable extends TextDescribable<HasInventory> {
  isActive(entity: Entity, world: World<HasInventory>) {
    const isInInventory = world.state.inventory.includes(entity);
    return !isInInventory && super.isActive(entity, world);
  }
}
