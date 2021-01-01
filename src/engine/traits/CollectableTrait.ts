import { Trait } from "../types/Trait";
import { Entity } from "../types/Entity";
import { Context } from "../types/Context";

export class CollectableTrait extends Trait {
  apply(context: Context, entity: Entity) {
    context.inventory.push(entity);
    return {
      description: `Picked up ${entity.name}`,
    };
  }

  createActionName(entity: Entity): string {
    return `Pick up ${entity.name}`;
  }
}
