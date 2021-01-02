import { Entity } from "../types/Entity";
import { Observable } from "../components/Observable";
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
  filterInstances(entity.getComponents(world), Observable)
    .filter((component) => component.isActive(entity, world))
    .map((obs) => obs.observe(entity, world));
