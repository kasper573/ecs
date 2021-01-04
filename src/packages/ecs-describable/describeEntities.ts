import { Entity } from "../ecs/Entity";
import { System } from "../ecs/System";
import { Describable } from "./Describable";

export const describeEntities = (entities: Entity[], system: System) =>
  entities
    .reduce(
      (lines, entity) => [...lines, ...describeEntity(entity, system)],
      [] as string[]
    )
    .join("\n");

export const describeEntity = (entity: Entity, system: System): string[] =>
  entity
    .getComponents(system)
    .filterType(Describable)
    .filter((component) => component.isActive(entity, system))
    .map((obs) => obs.describe(entity, system));
