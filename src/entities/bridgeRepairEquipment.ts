import { Entity } from "../engine/types/Entity";
import { CollectableTrait } from "../engine/traits/CollectableTrait";
import { ObservableTrait } from "../engine/traits/ObservableTrait";
import { Trait } from "../engine/types/Trait";
import { bridge } from "./bridge";

export const bridgeRepairEquipment = Entity.forTraits(
  "repair kit",
  new CollectableTrait(),
  new ObservableTrait({
    observe: (entity) =>
      `There's a ${entity.name} conveniently laying on the ground.`,
  }),
  new Trait({
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
