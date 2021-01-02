import { Effect } from "../engine/types/Effect";
import { Entity } from "../engine/types/Entity";
import { Component } from "../engine/types/Component";
import { Observable } from "../engine/components/Observable";

const fallDown: Effect = {
  description: "The bridge collapses under your weight. You fall down a pit.",
};

export const bridge = new Entity<"fragile" | "broken" | "sturdy">(
  "bridge",
  "fragile",
  (state, world) => [
    new Component({
      action: (entity) => `Cross the ${entity.name}`,
      isActive: (entity, world) => world.sceneId === "cliff",
      apply: (entity, world) => {
        if (state === "sturdy") {
          world.sceneId = "otherSide";
        } else if (state === "fragile") {
          world.sceneId = "bridge";
        } else if (state === "broken") {
          world.sceneId = "pit";
          return fallDown;
        }
      },
    }),
    new Component({
      action: () => "Proceed",
      isActive: (entity, world) => world.sceneId === "bridge",
      apply: (entity, world) => {
        if (state === "sturdy") {
          world.sceneId = "otherSide";
        } else {
          entity.state = "broken";
          world.sceneId = "pit";
          return fallDown;
        }
      },
    }),
    new Component({
      action: () => "Go back",
      isActive: (entity, world) => world.sceneId === "bridge",
      apply: (entity, world) => {
        world.sceneId = "cliff";
      },
    }),
    new Observable({
      observe: () =>
        world.sceneId === "bridge"
          ? "You are standing on the bridge. It seems very unstable."
          : `You stand in front of a bridge. It looks ${state}.`,
    }),
  ]
);
