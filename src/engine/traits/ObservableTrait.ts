import { Derive, Trait, TraitOptions } from "../types/Trait";
import { Entity } from "../types/Entity";
import { World } from "../types/World";

export class ObservableTrait extends Trait {
  public readonly observe: ObservableTraitOptions["observe"];

  isActive(entity: Entity, world: World) {
    const isInInventory = world.inventory.includes(entity);
    return !isInInventory && super.isActive(entity, world);
  }

  constructor(options: ObservableTraitOptions) {
    super(options);
    this.observe = options.observe;
  }
}

export type ObservableTraitOptions = TraitOptions & {
  observe: Derive<string>;
};
