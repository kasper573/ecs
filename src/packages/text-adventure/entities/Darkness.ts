import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-collectable/Describable";
import { Lighter } from "./Lighter";

export class Darkness extends Entity {
  constructor() {
    super("darkness", undefined, () => [
      new Describable({
        describe: () => "It is very dark.",
        isActive: (entity, system) => !Lighter.isLit(system),
      }),
    ]);
  }
}
