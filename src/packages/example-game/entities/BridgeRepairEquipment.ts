import { Entity } from "../../ecs/Entity";
import { Collectable } from "../../ecs-collectable/Collectable";
import { Describable } from "../../ecs-collectable/Describable";
import { Interactive } from "../../ecs-interactive/Interactive";
import { TextAdventureState } from "../TextAventureState";
import { Scenes } from "../Scenes";
import { Bridge } from "./Bridge";

export class BridgeRepairEquipment extends Entity {
  constructor() {
    super("repair kit", undefined, (state, system) => {
      const bridge = system.scene.findType(Bridge);
      return [
        new Collectable(),
        new Describable({
          describe: (entity) =>
            `There's a ${entity.name} conveniently laying on the ground.`,
        }),
        new Interactive<TextAdventureState>({
          action: () => "Repair bridge",
          isActive: (entity, system) =>
            system.state.inventory.includes(entity) &&
            system.sceneId === Scenes.cliff &&
            !!bridge &&
            bridge.state !== "sturdy",
          apply: () => {
            if (bridge) {
              bridge.state = "sturdy";
              return { description: "You repaired the bridge." };
            }
          },
        }),
      ];
    });
  }
}
