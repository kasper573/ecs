import { Component, ComponentOptions } from "../ecs/Component";
import { Resolvable, resolve } from "../ecs/Resolvable";
import { InteractionResult } from "./InteractionResult";

export class Interactive<Entity> extends Component<Entity, InteractiveOptions> {
  get action() {
    return resolve(this.options.action) ?? "";
  }

  apply() {
    if (this.options.apply) {
      return this.options.apply();
    }
  }
}

export type InteractiveOptions = ComponentOptions & {
  action: Resolvable<string>;
  apply: () => InteractionResult | undefined | void;
};
