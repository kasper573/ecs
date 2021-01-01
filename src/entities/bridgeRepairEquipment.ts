import { Entity } from "../engine/types/Entity";
import { CollectableTrait } from "../engine/traits/CollectableTrait";
import { ObservableTrait } from "../engine/traits/ObservableTrait";

export const bridgeRepairEquipment = Entity.forTraits(
  "repair kit",
  new CollectableTrait(),
  new ObservableTrait({
    observe: (entity) =>
      `There's a ${entity.name} conveniently laying on the ground.`,
  })
);
