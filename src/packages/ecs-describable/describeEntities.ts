import { Entity } from "../ecs/Entity";
import { Describable } from "./Describable";

export const describeEntities = <SystemState>(
  entities: Entity<SystemState>[]
) =>
  entities
    .reduce(
      (lines, entity) => [...lines, ...describeEntity(entity)],
      [] as string[]
    )
    .join("\n");

export const describeEntity = <SystemState>(
  entity: Entity<SystemState>
): string[] =>
  entity
    .findComponents(Describable)
    .filter((component) => component.isActive)
    .map((component) => component.description);
