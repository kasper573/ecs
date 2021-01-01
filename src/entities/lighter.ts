import { Entity } from "../engine/types/Entity";
import { Trait } from "../engine/types/Trait";
import { Context } from "../engine/types/Context";

export const lighter = new Entity<"lit" | "unlit">(
  "lighter",
  "unlit",
  (state) => [
    new Trait({
      isActive: (entity, context) => context.roomId === "pit",
      action: () => (state === "lit" ? "Stop using lighter" : "Use lighter"),
      apply: (entity) => {
        entity.state = entity.state === "lit" ? "unlit" : "lit";
      },
    }),
  ]
);

export const isLit = (context: Context) =>
  context.inventory.includes(lighter) && lighter.state === "lit";
