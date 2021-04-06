import { Entity } from "../../ecs/Entity";
import { Describable } from "./Describable";

export const describeEntities = (entities: readonly Entity[]) =>
  entities
    .reduce(
      (lines, entity) => [...lines, ...describeEntity(entity)],
      [] as string[]
    )
    .join("\n");

export const describeEntity = (entity: Entity): readonly string[] =>
  entity.components
    .filterType(Describable)
    .filter((component) => component.isActive)
    .map((component) => component.description.trim())
    .filter((description) => !!description);
