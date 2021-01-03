import { Entity } from "../../ecs/Entity";
import { World } from "../../ecs/World";
import { TextAdventureState } from "../TextAventureState";
import { Scenes } from "../Scenes";
import { Interactive } from "../../ecs-interactive/Interactive";

export class Lighter extends Entity<"lit" | "unlit"> {
  constructor() {
    super("lighter", "unlit", (state) => [
      new Interactive({
        isActive: (entity, world) => world.sceneId === Scenes.pit,
        action: () => (state === "lit" ? "Stop using lighter" : "Use lighter"),
        apply: (entity) => {
          entity.state = entity.state === "lit" ? "unlit" : "lit";
        },
      }),
    ]);
  }

  static isLit(world: World<TextAdventureState>) {
    const lighter = world.state.inventory.findType(Lighter);
    if (lighter) {
      return lighter.state === "lit";
    }
    return false;
  }
}
