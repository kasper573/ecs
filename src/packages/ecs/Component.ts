import { Entity } from "./Entity";
import { World } from "./World";

export class Component<WorldState = any> {
  constructor(protected options: ComponentOptions<WorldState> = {}) {}

  isActive(entity: Entity, world: World<WorldState>) {
    if (this.options.isActive) {
      return this.options.isActive(entity, world);
    }
    return true;
  }
}

export type ComponentOptions<WorldState> = {
  isActive?: Derive<boolean, WorldState>;
};

export type Derive<T, WorldState> = (
  entity: Entity,
  world: World<WorldState>
) => T;
