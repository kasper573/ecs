import { Derive, Component, ComponentOptions } from "../ecs/Component";

export class Describable<SystemState = any> extends Component<SystemState> {
  public readonly describe: DescribableComponentOptions<SystemState>["describe"];

  constructor(options: DescribableComponentOptions<SystemState>) {
    super(options);
    this.describe = options.describe;
  }
}

export type DescribableComponentOptions<
  SystemState = any
> = ComponentOptions<SystemState> & {
  describe: Derive<string, SystemState>;
};
