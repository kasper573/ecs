import { InteractionResult } from "../../ecs-interactive/InteractionResult";
import { Interactive } from "../../ecs-interactive/Interactive";
import { Describable } from "../../ecs-describable/Describable";
import { Scenes } from "../Scenes";
import { StatefulEntity } from "../../ecs/StatefulEntity";
import { TextAdventureState } from "../TextAventureState";

const fallDown: InteractionResult =
  "The bridge collapses under your weight. You fall down a pit.";

export type BridgeState = "fragile" | "broken" | "sturdy";

export class Bridge extends StatefulEntity<BridgeState, TextAdventureState> {
  constructor() {
    super("fragile");
    this.components = [
      new Interactive({
        action: "Cross the bridge",
        isActive: () => this.system.sceneId === Scenes.cliff,
        apply: () => {
          if (this.state === "sturdy") {
            this.system.sceneId = Scenes.otherSide;
          } else if (this.state === "fragile") {
            this.system.sceneId = Scenes.bridge;
          } else if (this.state === "broken") {
            this.system.sceneId = Scenes.pit;
            return fallDown;
          }
        },
      }),
      new Interactive({
        action: "Proceed",
        isActive: () => this.system.sceneId === Scenes.bridge,
        apply: () => {
          if (this.state === "sturdy") {
            this.system.sceneId = Scenes.otherSide;
          } else {
            this.state = "broken";
            this.system.sceneId = Scenes.pit;
            return fallDown;
          }
        },
      }),
      new Interactive({
        action: "Go back",
        isActive: () => this.system.sceneId === Scenes.bridge,
        apply: () => {
          this.system.sceneId = Scenes.cliff;
        },
      }),
      new Describable({
        description: () =>
          this.system.sceneId === Scenes.bridge
            ? "You are standing on the bridge. It seems very unstable."
            : `You stand in front of a bridge. It looks ${this.state}.`,
      }),
    ];
  }
}
