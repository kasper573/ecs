import { Derive, Component, ComponentOptions } from "../ecs/Component";

export class Describable<WorldState = any> extends Component<WorldState> {
  public readonly describe: DescribableComponentOptions<WorldState>["describe"];

  constructor(options: DescribableComponentOptions<WorldState>) {
    super(options);
    this.describe = options.describe;
  }
}

export type DescribableComponentOptions<
  WorldState = any
> = ComponentOptions<WorldState> & {
  describe: Derive<string, WorldState>;
};
