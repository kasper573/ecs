import { Entity } from "../ecs/Entity";
import { Describable as TextDescribable } from "../ecs-describable/Describable";
import { System } from "../ecs/System";
import { HasInventory } from "./HasInventory";

/**
 * Inventory items should not be described in the system
 */
export class Describable extends TextDescribable<HasInventory> {
  isActive(entity: Entity, system: System<HasInventory>) {
    const isInInventory = system.state.inventory.includes(entity);
    return !isInInventory && super.isActive(entity, system);
  }
}
