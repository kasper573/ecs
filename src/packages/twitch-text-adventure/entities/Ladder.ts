import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-describable/Describable";
import { Interactive } from "../../ecs-interactive/Interactive";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
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
