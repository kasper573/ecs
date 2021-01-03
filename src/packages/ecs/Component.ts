import { Entity } from "./Entity";
import { Effect } from "./Effect";
import { World } from "./World";

/**
 * Designed to be able to conveniently instantiate and extend Component
 */
export class Component<WorldState = any> {
  constructor(private options: ComponentOptions<WorldState> = {}) {}

  action(entity: Entity, world: World<WorldState>) {
    if (this.options.action) {
      return this.options.action(entity, world);
    }
    return "";
  }

  apply(entity: Entity, world: World<WorldState>) {
    if (this.options.apply) {
      return this.options.apply(entity, world);
    }
  }

  isActive(entity: Entity, world: World<WorldState>) {
    if (this.options.isActive) {
      return this.options.isActive(entity, world);
    }
    return true;
  }
}

export type ComponentOptions<WorldState> = {
  action?: Derive<string, WorldState>;
  apply?: Derive<Effect | undefined | void, WorldState>;
  isActive?: Derive<boolean, WorldState>;
};

export type Derive<T, WorldState> = (
  entity: Entity,
  world: World<WorldState>
) => T;
