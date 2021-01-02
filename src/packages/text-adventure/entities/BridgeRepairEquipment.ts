import { Entity } from "../../ecs/Entity";
import { Collectable } from "../Collectable";
import { Describable } from "../../ecs-text/Describable";
import { Component } from "../../ecs/Component";
import { Bridge } from "./Bridge";

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
        new Component({
          action: () => "Repair bridge",
          isActive: (entity, world) =>
            world.inventory.includes(entity) &&
            world.sceneId === "cliff" &&
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
