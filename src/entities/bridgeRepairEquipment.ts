import { Entity } from "../engine/types/Entity";
import { Collectable } from "../engine/components/Collectable";
import { Observable } from "../engine/components/Observable";
import { Component } from "../engine/types/Component";
import { bridge } from "./bridge";

export const bridgeRepairEquipment = Entity.forComponents(
  "repair kit",
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
      bridge.state !== "sturdy",
    apply: () => {
      bridge.state = "sturdy";
      return { description: "You repaired the bridge." };
    },
  })
);
