import { Component, ComponentOptions } from "../ecs/Component";
import { Resolvable, resolve } from "../ecs/Resolvable";

export class Describable<Entity> extends Component<
  Entity,
  DescribableComponentOptions
> {
  get description() {
    return resolve(this.options.description) ?? "";
  }
}

export type DescribableComponentOptions = ComponentOptions & {
  description: Resolvable<string>;
};
