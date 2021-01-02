import { Entity } from "../ecs/Entity";
import { Describable } from "./Describable";
import { World } from "../ecs/World";

export const describeEntities = (entities: Entity[], world: World) =>
  entities
    .reduce(
      (lines, entity) => [...lines, ...describeEntity(entity, world)],
      [] as string[]
    )
    .join("\n");

export const describeEntity = (entity: Entity, world: World): string[] =>
  entity
    .getComponents(world)
    .filterType(Describable)
    .filter((component) => component.isActive(entity, world))
    .map((obs) => obs.describe(entity, world));
