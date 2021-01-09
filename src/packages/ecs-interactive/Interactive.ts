import { Component, ComponentOptions } from "../ecs/Component";
import { Resolvable, resolve } from "../ecs/util/Resolvable";
import { InteractionResult } from "./InteractionResult";

export class Interactive<Entity> extends Component<Entity, InteractiveOptions> {
  get action() {
    return resolve(this.options.action) ?? "";
  }

  perform() {
    if (this.options.perform) {
      return this.options.perform();
    }
  }
}

export type InteractiveOptions = ComponentOptions & {
  action: Resolvable<string>;
  perform: () => InteractionResult | undefined | void;
};
