import { Component, ComponentOptions } from "../ecs/Component";

export class Describable<Entity> extends Component<
  Entity,
  DescribableComponentOptions
> {
  get description() {
    return this.resolveOption("description", "");
  }
}

export type DescribableComponentOptions = ComponentOptions & {
  description: string;
};
