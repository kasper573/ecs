import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-collectable/Describable";
import { Interactive } from "../../ecs-interactive/Interactive";
import { Scenes } from "../Scenes";
import { Lighter } from "./Lighter";

export class Ladder extends Entity {
  constructor() {
    super("ladder", undefined, () => [
      new Describable({
        describe: () => "You see a ladder.",
        isActive: (entity, system) => Lighter.isLit(system),
      }),
      new Interactive({
        action: () => "Climb ladder",
        isActive: (entity, system) => Lighter.isLit(system),
        apply: (entity, system) => {
          system.sceneId = Scenes.cliff;
        },
      }),
    ]);
  }
}
