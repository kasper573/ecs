import { Component, ComponentOptions } from "../ecs/Component";
import { InteractionResult } from "./InteractionResult";

export class Interactive<Entity> extends Component<Entity, InteractiveOptions> {
  get action() {
    return this.resolveOption("action", "");
  }

  apply() {
    return this.resolveOption("apply", undefined);
  }
}

export type InteractiveOptions = ComponentOptions & {
  action: string;
  apply: InteractionResult | undefined | void;
};
