import { InteractionResult } from "../../ecs-interactive/InteractionResult";
import { Interactive } from "../../ecs-interactive/Interactive";
import { Describable } from "../../ecs-describable/Describable";
import { Entity } from "../../ecs/Entity";
import { findSystemComponent } from "../../ecs/findSystemComponent";
import { SceneManager } from "../../ecs-scene-manager/SceneManager";
import { Scenes } from "../Scenes";

const fallDown: InteractionResult =
  "The bridge collapses under your weight. You fall down a pit.";

export type BridgeState = "fragile" | "broken" | "sturdy";

export class Bridge extends Entity {
  state: BridgeState = "fragile";
  get sceneManager() {
    return findSystemComponent(this.system, SceneManager);
  }
  constructor() {
    super();

    this.components.push(
      new Interactive({
        action: "Cross the bridge",
        isActive: () => this.sceneManager?.sceneId === Scenes.cliff,
        effect: () => {
          if (this.state === "sturdy") {
            this.sceneManager!.sceneId = Scenes.otherSide;
          } else if (this.state === "fragile") {
            this.sceneManager!.sceneId = Scenes.bridge;
          } else if (this.state === "broken") {
            this.sceneManager!.sceneId = Scenes.pit;
            return fallDown;
          }
        },
      }),
      new Interactive({
        action: "Proceed",
        isActive: () => this.sceneManager?.sceneId === Scenes.bridge,
        effect: () => {
          if (this.state === "sturdy") {
            this.sceneManager!.sceneId = Scenes.otherSide;
          } else {
            this.state = "broken";
            this.sceneManager!.sceneId = Scenes.pit;
            return fallDown;
          }
        },
      }),
      new Interactive({
        action: "Go back",
        isActive: () => this.sceneManager?.sceneId === Scenes.bridge,
        effect: () => {
          this.sceneManager!.sceneId = Scenes.cliff;
        },
      }),
      new Describable({
        isActive: () =>
          [Scenes.bridge, Scenes.cliff].includes(this.sceneManager?.sceneId!),
        description: () =>
          this.sceneManager?.sceneId === Scenes.bridge
            ? "You are standing on the bridge. It seems very unstable."
            : `You stand in front of a bridge. It looks ${this.state}.`,
      })
    );
  }
}
