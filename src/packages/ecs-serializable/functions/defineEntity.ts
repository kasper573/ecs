import { RedefinableEntity } from "../RedefinableEntity";
import { EntityDefinition } from "../types/EntityDefinition";
import { EntityId } from "../../ecs/Entity";
import { EntityInitializerId } from "../types/EntityInitializer";

export const defineEntity = (definition: EntityDefinition) =>
  class DefinedEntity extends RedefinableEntity {
    constructor(id: EntityInitializerId) {
      super([], [], {
        name: definition.name,
        id: id as EntityId,
      });
    }
  };
