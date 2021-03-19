import { LibraryDefinition } from "../types/LibraryDefinition";
import { EntityDefinition } from "../types/EntityDefinition";
import { ComponentDefinition } from "../types/ComponentDefinition";

export const getDefinitionsInLibrary = (library: LibraryDefinition) => {
  const entities: EntityDefinition[] = [];
  const components: ComponentDefinition[] = [];
  for (const node of library) {
    if (node.type === "entity") {
      entities.push(node.entity);
    }
    if (node.type === "component") {
      components.push(node.component);
    }
  }
  return { entities, components };
};
