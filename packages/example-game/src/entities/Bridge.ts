import { InteractionResult } from "../../../ecs-text-adventure/src/interactive/InteractionResult";
import { Interactive } from "../../../ecs-text-adventure/src/interactive/Interactive";
import { Describable } from "../../../ecs-text-adventure/src/describable/Describable";
import { Entity } from "../../../ecs/src/Entity";
import { SceneManager } from "../../../ecs-scene-manager/src/SceneManager";

const fallDown: InteractionResult =
  "The bridge collapses under your weight. You fall down a pit.";

export type BridgeState = "fragile" | "broken" | "sturdy";

export class Bridge extends Entity {
  state: BridgeState = "fragile";
  get sceneManager() {
    return this.system?.entities.findComponent(SceneManager);
  }
  constructor() {
    super();

    this.components.push(
      new Interactive({
        action: "Cross the bridge",
        isActive: () => this.sceneManager?.sceneId === "cliff",
        effect: () => {
          if (this.state === "sturdy") {
            this.sceneManager!.sceneId = "otherSide";
          } else if (this.state === "fragile") {
            this.sceneManager!.sceneId = "bridge";
          } else if (this.state === "broken") {
            this.sceneManager!.sceneId = "pit";
            return fallDown;
          }
        },
      }),
      new Interactive({
        action: "Proceed",
        isActive: () => this.sceneManager?.sceneId === "bridge",
        effect: () => {
          if (this.state === "sturdy") {
            this.sceneManager!.sceneId = "otherSide";
          } else {
            this.state = "broken";
            this.sceneManager!.sceneId = "pit";
            return fallDown;
          }
        },
      }),
      new Interactive({
        action: "Go back",
        isActive: () => this.sceneManager?.sceneId === "bridge",
        effect: () => {
          this.sceneManager!.sceneId = "cliff";
        },
      }),
      new Describable({
        isActive: () =>
          ["bridge", "cliff"].includes(this.sceneManager?.sceneId!),
        description: () =>
          this.sceneManager?.sceneId === "bridge"
            ? "You are standing on the bridge. It seems very unstable."
            : `You stand in front of a bridge. It looks ${this.state}.`,
      })
    );
  }
}
