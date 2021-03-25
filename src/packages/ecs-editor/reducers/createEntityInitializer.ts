import { set, values } from "../../nominal";
import { inheritEntityDefinitionComponents } from "../../ecs-serializable/factories/inheritEntityDefinitionComponents";
import { LibraryEntityNode } from "../../ecs-serializable/types/LibraryNode";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const createEntityInitializer = createEditorStateReducer<EntityInitializer>(
  ({ ecs: { entities, library } }, { payload: initializer }) => {
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
  }
);
