import { Entity } from "../engine/types/Entity";
import { Component } from "../engine/types/Component";
import { World } from "../engine/types/World";

export class Lighter extends Entity<"lit" | "unlit"> {
  constructor() {
    super("lighter", "unlit", (state) => [
      new Component({
        isActive: (entity, world) => world.sceneId === "pit",
        action: () => (state === "lit" ? "Stop using lighter" : "Use lighter"),
        apply: (entity) => {
          entity.state = entity.state === "lit" ? "unlit" : "lit";
        },
      }),
    ]);
  }
}

export const isLit = (world: World) => {
  const lighter = world.inventory.findType(Lighter);
  if (lighter) {
    return lighter.state === "lit";
  }
  return false;
};
