import { EditorStateReducer } from "../types/EditorStateReducer";
import { set, values } from "../../nominal";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { inheritEntityDefinitionComponents } from "../../ecs-serializable/factories/inheritEntityDefinitionComponents";
import { LibraryEntityNode } from "../../ecs-serializable/types/LibraryNode";

export const createEntityInitializerReducer: EditorStateReducer<EntityInitializer> = (
  { ecs: { entities, library, scenes } },
  { payload: initializer }
) => {
  const definition = values(library).find(
    (node): node is LibraryEntityNode =>
      node.type === "entity" && node.entity.id === initializer.definitionId
  );
  if (!definition) {
    throw new Error(`Referenced entity definition not found`);
  }
  set(
    entities,
    initializer.id,
    inheritEntityDefinitionComponents(initializer, definition.entity)
  );
};
