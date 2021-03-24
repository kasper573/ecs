import {
  EntityDefinition,
  EntityDefinitionId,
} from "../types/EntityDefinition";
import {
  ComponentDefinition,
  ComponentDefinitionId,
} from "../types/ComponentDefinition";
import { set, values } from "../../nominal";
import { SerializableECS } from "../types/SerializableECS";

export const getDefinitionsInLibrary = (
  library: SerializableECS["library"]
) => {
  const entities: Record<EntityDefinitionId, EntityDefinition> = {};
  const components: Record<ComponentDefinitionId, ComponentDefinition> = {};
  for (const node of values(library)) {
    if (node.type === "entity") {
      set(entities, node.entity.id, node.entity);
    }
    if (node.type === "component") {
      set(components, node.component.id, node.component);
    }
  }
  return { entities, components };
};
