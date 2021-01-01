import { Entity } from "../types/Entity";
import { ObservableTrait } from "../traits/ObservableTrait";
import { filterInstances } from "../functions/filterInstances";
import { Context } from "../types/Context";

export const describeEntities = (entities: Entity[], context: Context) =>
  entities
    .reduce(
      (lines, entity) => [...lines, ...describeEntity(entity, context)],
      [] as string[]
    )
    .join("\n");

const describeEntity = (entity: Entity, context: Context): string[] =>
  filterInstances(entity.getTraits(context), ObservableTrait)
    .filter((trait) => trait.isActive(entity, context))
    .map((obs) => obs.observe(entity, context));
