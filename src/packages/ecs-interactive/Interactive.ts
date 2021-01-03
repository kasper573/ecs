import { World } from "../ecs/World";
import { Entity } from "../ecs/Entity";
import { Component, ComponentOptions, Derive } from "../ecs/Component";
import { Effect } from "./Effect";

export class Interactive<WorldState = any> extends Component<WorldState> {
  constructor(protected options: InteractiveOptions<WorldState> = {}) {
    super(options);
  }

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
}

export type InteractiveOptions<WorldState> = ComponentOptions<WorldState> & {
  action?: Derive<string, WorldState>;
  apply?: Derive<Effect | undefined | void, WorldState>;
};
