import { Entity } from "../ecs/Entity";
import { Describable } from "./Describable";

export const describeEntities = <SystemState>(
  entities: readonly Entity<SystemState>[]
) =>
  entities
    .reduce(
      (lines, entity) => [...lines, ...describeEntity(entity)],
      [] as string[]
    )
    .join("\n");

export const describeEntity = <SystemState>(
  entity: Entity<SystemState>
): readonly string[] =>
  entity.components
    .filterType(Describable)
    .filter((component) => component.isActive)
    .map((component) => component.description);
