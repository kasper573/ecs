import { Entity } from "../engine/types/Entity";
import { Collectable } from "../engine/components/Collectable";
import { Observable } from "../engine/components/Observable";
import { Component } from "../engine/types/Component";
import { Bridge } from "./Bridge";
import { findInstance } from "../engine/functions/findInstance";

export class BridgeRepairEquipment extends Entity {
  constructor() {
    super("repair kit", undefined, (state, world) => {
      const bridge = findInstance(world.scene, Bridge);
      return [
        new Collectable(),
        new Observable({
          observe: (entity) =>
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
