import { System } from "../ecs/System";
import { Entity } from "../ecs/Entity";
import { Component, ComponentOptions, Derive } from "../ecs/Component";
import { Effect } from "./Effect";

export class Interactive<SystemState = any> extends Component<SystemState> {
  constructor(protected options: InteractiveOptions<SystemState> = {}) {
    super(options);
  }

  action(entity: Entity, system: System<SystemState>) {
    if (this.options.action) {
      return this.options.action(entity, system);
    }
    return "";
  }

  apply(entity: Entity, system: System<SystemState>) {
    if (this.options.apply) {
      return this.options.apply(entity, system);
    }
  }
}

export type InteractiveOptions<SystemState> = ComponentOptions<SystemState> & {
  action?: Derive<string, SystemState>;
  apply?: Derive<Effect | undefined | void, SystemState>;
};
