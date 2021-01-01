import { Effect } from "../engine/types/Effect";
import { Entity } from "../engine/types/Entity";
import { Trait } from "../engine/types/Trait";
import { ObservableTrait } from "../engine/traits/ObservableTrait";

const fallDown: Effect = {
  description: "The bridge collapses under your weight. You fall down a pit.",
};

export const bridge = new Entity<"fragile" | "broken" | "sturdy">(
  "bridge",
  "fragile",
  (state, world) => [
    new Trait({
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
    new Trait({
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
    new Trait({
      action: () => "Go back",
      isActive: (entity, world) => world.sceneId === "bridge",
      apply: (entity, world) => {
        world.sceneId = "cliff";
      },
    }),
    new ObservableTrait({
      observe: () =>
        world.sceneId === "bridge"
          ? "You are standing on the bridge. It seems very unstable."
          : `You stand in front of a bridge. It looks ${state}.`,
    }),
  ]
);
