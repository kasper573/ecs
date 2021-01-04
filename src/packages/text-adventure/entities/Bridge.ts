import { Effect } from "../../ecs-interactive/Effect";
import { Interactive } from "../../ecs-interactive/Interactive";
import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-collectable/Describable";
import { Scenes } from "../Scenes";

const fallDown: Effect = {
  description: "The bridge collapses under your weight. You fall down a pit.",
};

export type BridgeState = "fragile" | "broken" | "sturdy";

export class Bridge extends Entity<BridgeState> {
  constructor() {
    super("bridge", "fragile", (state, system) => [
      new Interactive({
        action: (entity) => `Cross the ${entity.name}`,
        isActive: (entity, system) => system.sceneId === Scenes.cliff,
        apply: (entity, system) => {
          if (state === "sturdy") {
            system.sceneId = Scenes.otherSide;
          } else if (state === "fragile") {
            system.sceneId = Scenes.bridge;
          } else if (state === "broken") {
            system.sceneId = Scenes.pit;
            return fallDown;
          }
        },
      }),
      new Interactive({
        action: () => "Proceed",
        isActive: (entity, system) => system.sceneId === Scenes.bridge,
        apply: (entity, system) => {
          if (state === "sturdy") {
            system.sceneId = Scenes.otherSide;
          } else {
            entity.state = "broken";
            system.sceneId = Scenes.pit;
            return fallDown;
          }
        },
      }),
      new Interactive({
        action: () => "Go back",
        isActive: (entity, system) => system.sceneId === Scenes.bridge,
        apply: (entity, system) => {
          system.sceneId = Scenes.cliff;
        },
      }),
      new Describable({
        describe: () =>
          system.sceneId === Scenes.bridge
            ? "You are standing on the bridge. It seems very unstable."
            : `You stand in front of a bridge. It looks ${state}.`,
      }),
    ]);
  }
}
