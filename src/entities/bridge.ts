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
  (state, context) => [
    new Trait({
      action: (entity) => `Cross the ${entity.name}`,
      isActive: (entity, context) => context.roomId === "cliff",
      apply: (entity, context) => {
        if (state === "sturdy") {
          context.roomId = "otherSide";
        } else if (state === "fragile") {
          context.roomId = "bridge";
        } else if (state === "broken") {
          context.roomId = "pit";
          return fallDown;
        }
      },
    }),
    new Trait({
      action: () => "Proceed",
      isActive: (entity, context) => context.roomId === "bridge",
      apply: (entity, context) => {
        if (state === "sturdy") {
          context.roomId = "otherSide";
        } else {
          entity.state = "broken";
          context.roomId = "pit";
          return fallDown;
        }
      },
    }),
    new Trait({
      action: () => "Go back",
      isActive: (entity, context) => context.roomId === "bridge",
      apply: (entity, context) => {
        context.roomId = "cliff";
      },
    }),
    new ObservableTrait({
      observe: () =>
        context.roomId === "bridge"
          ? "You are standing on the bridge. It seems very unstable."
          : `You stand in front of a bridge. It looks ${state}.`,
    }),
  ]
);
