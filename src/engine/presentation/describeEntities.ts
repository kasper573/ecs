import { Entity } from "../types/Entity";
import { ObservableTrait } from "../traits/ObservableTrait";
import { filterInstances } from "../functions/filterInstances";
import { World } from "../types/World";

export const describeEntities = (entities: Entity[], world: World) =>
  entities
    .reduce(
      (lines, entity) => [...lines, ...describeEntity(entity, world)],
      [] as string[]
    )
    .join("\n");

export const describeEntity = (entity: Entity, world: World): string[] =>
  filterInstances(entity.getTraits(world), ObservableTrait)
    .filter((trait) => trait.isActive(entity, world))
    .map((obs) => obs.observe(entity, world));
