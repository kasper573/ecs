import { Entity } from "./Entity";
import { System } from "./System";

export class Component<SystemState = any> {
  constructor(protected options: ComponentOptions<SystemState> = {}) {}

  isActive(entity: Entity, system: System<SystemState>) {
    if (this.options.isActive) {
      return this.options.isActive(entity, system);
    }
    return true;
  }
}

export type ComponentOptions<SystemState> = {
  isActive?: Derive<boolean, SystemState>;
};

export type Derive<T, SystemState> = (
  entity: Entity,
  system: System<SystemState>
) => T;
