import { Entity } from "../types/Entity";
import { ObservableTrait } from "../traits/ObservableTrait";
import { filterInstances } from "../functions/filterInstances";

export const describeEntity = (entity: Entity) =>
  filterInstances(entity.traits, ObservableTrait)
    .map((obs) => obs.describe(entity))
    .join("\n");
