import { Entity } from "../../ecs/Entity";
import { Collectable } from "../../ecs-collectable/Collectable";
import { Describable } from "../../ecs-collectable/Describable";
import { Component } from "../../ecs/Component";
import { Bridge } from "./Bridge";
import { TextAdventureState } from "../TextAventureState";
import { Scenes } from "../Scenes";

export class BridgeRepairEquipment extends Entity {
  constructor() {
    super("repair kit", undefined, (state, world) => {
      const bridge = world.scene.findType(Bridge);
      return [
        new Collectable(),
        new Describable({
          describe: (entity) =>
            `There's a ${entity.name} conveniently laying on the ground.`,
        }),
        new Component<TextAdventureState>({
          action: () => "Repair bridge",
          isActive: (entity, world) =>
            world.state.inventory.includes(entity) &&
            world.sceneId === Scenes.cliff &&
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
