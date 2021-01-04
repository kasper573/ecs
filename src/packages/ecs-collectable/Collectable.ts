import { Entity } from "../ecs/Entity";
import { System } from "../ecs/System";
import { Interactive } from "../ecs-interactive/Interactive";
import { HasInventory } from "./HasInventory";

export class Collectable extends Interactive<HasInventory> {
  isActive(entity: Entity, system: System<HasInventory>) {
    return !system.state.inventory.includes(entity);
  }

  apply(entity: Entity, system: System<HasInventory>) {
    system.state.inventory.push(entity);
    system.scene.remove(entity);
    return {
      description: `Picked up ${entity.name}.`,
    };
  }

  action(entity: Entity): string {
    return `Pick up ${entity.name}`;
  }
}
