import { RedefinableEntity } from "../RedefinableEntity";
import { EntityDefinition } from "../types/EntityDefinition";
import { EntityInitializerId } from "../types/EntityInitializer";

export const defineEntity = (definition: EntityDefinition) =>
  class DefinedEntity extends RedefinableEntity {
    constructor(id: EntityInitializerId) {
      super(id, definition.name);
    }
  };
