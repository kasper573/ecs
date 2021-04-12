import { Entity } from "../../../ecs/src/Entity";
import { Describable } from "../../../ecs-text-adventure/src/describable/Describable";
import { Interactive } from "../../../ecs-text-adventure/src/interactive/Interactive";
import { SceneManager } from "../../../ecs-scene-manager/src/SceneManager";
import { Lighter } from "./Lighter";

export class Ladder extends Entity {
  get sceneManager() {
    return this.system?.entities.findComponent(SceneManager);
  }
  constructor() {
    super();
    this.components.push(
      new Describable({
        description: "You see a ladder.",
        isActive: () => Lighter.isLit(this.system),
      }),
      new Interactive({
        action: "Climb ladder",
        isActive: () => Lighter.isLit(this.system),
        effect: () => {
          if (this.sceneManager) {
            this.sceneManager.sceneId = "cliff";
          }
        },
      })
    );
  }
}
