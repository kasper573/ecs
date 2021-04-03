import { InteractionResult } from "../../ecs-interactive/InteractionResult";
import { Interactive } from "../../ecs-interactive/Interactive";
import { Describable } from "../../ecs-describable/Describable";
import { TextAdventureSM } from "../TextAdventureSM";
import { Entity } from "../../ecs/Entity";

const fallDown: InteractionResult =
  "The bridge collapses under your weight. You fall down a pit.";

export type BridgeState = "fragile" | "broken" | "sturdy";

export class Bridge extends Entity {
  state: BridgeState = "fragile";
  get sceneManager() {
    return this.system.modules.resolveType(TextAdventureSM);
  }
  constructor() {
    super();

    this.components.push(
      new Interactive({
        action: "Cross the bridge",
        isActive: () => this.sceneManager.sceneId === "cliff",
        effect: () => {
          if (this.state === "sturdy") {
            this.sceneManager.sceneId = "otherSide";
          } else if (this.state === "fragile") {
            this.sceneManager.sceneId = "bridge";
          } else if (this.state === "broken") {
            this.sceneManager.sceneId = "pit";
            return fallDown;
          }
        },
      }),
      new Interactive({
        action: "Proceed",
        isActive: () => this.sceneManager.sceneId === "bridge",
        effect: () => {
          if (this.state === "sturdy") {
            this.sceneManager.sceneId = "otherSide";
          } else {
            this.state = "broken";
            this.sceneManager.sceneId = "pit";
            return fallDown;
          }
        },
      }),
      new Interactive({
        action: "Go back",
        isActive: () => this.sceneManager.sceneId === "bridge",
        effect: () => {
          this.sceneManager.sceneId = "cliff";
        },
      }),
      new Describable({
        description: () =>
          this.sceneManager.sceneId === "bridge"
            ? "You are standing on the bridge. It seems very unstable."
            : `You stand in front of a bridge. It looks ${this.state}.`,
      })
    );
  }
}
