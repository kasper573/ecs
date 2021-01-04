import { Entity } from "../../ecs/Entity";
import { System } from "../../ecs/System";
import { TextAdventureState } from "../TextAventureState";
import { Scenes } from "../Scenes";
import { Interactive } from "../../ecs-interactive/Interactive";

export class Lighter extends Entity<"lit" | "unlit"> {
  constructor() {
    super("lighter", "unlit", (state) => [
      new Interactive({
        isActive: (entity, system) => system.sceneId === Scenes.pit,
        action: () => (state === "lit" ? "Stop using lighter" : "Use lighter"),
        apply: (entity) => {
          entity.state = entity.state === "lit" ? "unlit" : "lit";
        },
      }),
    ]);
  }

  static isLit(system: System<TextAdventureState>) {
    const lighter = system.state.inventory.findType(Lighter);
    if (lighter) {
      return lighter.state === "lit";
    }
    return false;
  }
}
