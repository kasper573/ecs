import { Entity } from "./Entity";
import { Effect } from "./Effect";
import { Context } from "./Context";

/**
 * Designed to be able to conveniently instantiate and extend Trait
 */
export class Trait {
  constructor(private options: TraitOptions = {}) {}

  action(entity: Entity, context: Context) {
    if (this.options.action) {
      return this.options.action(entity, context);
    }
    return "";
  }

  apply(entity: Entity, context: Context) {
    if (this.options.apply) {
      return this.options.apply(entity, context);
    }
  }

  isActive(entity: Entity, context: Context) {
    if (this.options.isActive) {
      return this.options.isActive(entity, context);
    }
    return true;
  }
}

export type TraitOptions = {
  action?: Derive<string>;
  apply?: Derive<Effect | undefined | void>;
  isActive?: Derive<boolean>;
};

export type Derive<T> = (entity: Entity, context: Context) => T;
