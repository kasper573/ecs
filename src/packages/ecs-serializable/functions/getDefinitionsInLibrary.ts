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
import { LibraryNode } from "../types/LibraryNode";

export const getDefinitionsInLibrary = (
  library: SerializableECS["library"],
  filter: (node: LibraryNode) => boolean = ok
) => {
  const entities: Record<EntityDefinitionId, EntityDefinition> = {};
  const components: Record<ComponentDefinitionId, ComponentDefinition> = {};
  for (const node of values(library)) {
    if (!filter(node)) {
      continue;
    }
    if (node.type === "entity") {
      set(entities, node.entity.id, node.entity);
    }
    if (node.type === "component") {
      set(components, node.component.id, node.component);
    }
  }
  return { entities, components };
};

const ok = () => true;
