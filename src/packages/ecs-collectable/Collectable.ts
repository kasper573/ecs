import { Component } from "../ecs/Component";
import { Entity } from "../ecs/Entity";
import { World } from "../ecs/World";
import { HasInventory } from "./HasInventory";

export class Collectable extends Component<HasInventory> {
  isActive(entity: Entity, world: World<HasInventory>) {
    return !world.state.inventory.includes(entity);
  }

  apply(entity: Entity, world: World<HasInventory>) {
    world.state.inventory.push(entity);
    world.scene.remove(entity);
    return {
      description: `Picked up ${entity.name}.`,
    };
  }

  action(entity: Entity): string {
    return `Pick up ${entity.name}`;
  }
}
