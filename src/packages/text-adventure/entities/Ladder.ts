import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-collectable/Describable";
import { Lighter } from "./Lighter";
import { Scenes } from "../Scenes";

export class Ladder extends Entity {
  constructor() {
    super("ladder", undefined, () => [
      new Describable({
        action: () => "Climb ladder",
        describe: () => "You see a ladder.",
        isActive: (entity, world) => Lighter.isLit(world),
        apply: (entity, world) => {
          world.sceneId = Scenes.cliff;
        },
      }),
    ]);
  }
}
