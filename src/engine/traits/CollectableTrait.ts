import { Trait } from "../types/Trait";
import { Entity } from "../types/Entity";
import { Context } from "../types/Context";

export class CollectableTrait extends Trait {
  isActive(entity: Entity, context: Context) {
    return !context.inventory.includes(entity);
  }

  apply(entity: Entity, context: Context) {
    context.inventory.push(entity);

    return {
      description: `Picked up ${entity.name}`,
    };
  }

  action(entity: Entity): string {
    return `Pick up ${entity.name}`;
  }
}
