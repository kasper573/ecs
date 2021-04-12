import { RedefinableEntity } from "../RedefinableEntity";
import { EntityDefinition } from "../definition/EntityDefinition";
import { EntityInitializerId } from "../definition/EntityInitializer";

export const defineEntity = (definition: EntityDefinition) =>
  class DefinedEntity extends RedefinableEntity {
    constructor(id: EntityInitializerId) {
      super(id, definition.name);
    }
  };
