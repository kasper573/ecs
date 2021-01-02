import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-text/Describable";
import { isLit } from "./Lighter";

export class Darkness extends Entity {
  constructor() {
    super("darkness", undefined, () => [
      new Describable({
        describe: () => "It is very dark.",
        isActive: (entity, world) => !isLit(world),
      }),
    ]);
  }
}
