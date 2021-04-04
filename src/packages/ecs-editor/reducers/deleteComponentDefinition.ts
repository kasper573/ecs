import { remove } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import {
  ComponentDefinition,
  ComponentDefinitionId,
} from "../../ecs-serializable/types/ComponentDefinition";
import { core } from "../core";
import { EditorState } from "../types/EditorState";
import { deleteComponentInitializer } from "./deleteComponentInitializer";

export const deleteComponentDefinition = createEditorStateReducer<ComponentDefinitionId>(
  (state, { payload: id }) => {
    const def = state.ecs.componentDefinitions[id];
    if (!def) {
      throw new Error("Could not delete component definition");
    }

    // Remove related components from all entity definitions in the same system
    for (const [entity, component] of Array.from(related(state, def))) {
      deleteComponentInitializer(
        state,
        core.actions.deleteComponentInitializer({
          target: "definition",
          id: entity.id,
          componentId: component.id,
        })
      );
    }

    // Remove component definition
    remove(state.ecs.componentDefinitions, id);
  }
);

function* related(
  state: EditorState,
  componentDefinition: ComponentDefinition
) {
  for (const entityDefinition of Object.values(
    state.ecs.entityDefinitions
  ).filter((def) => def.systemId === componentDefinition.systemId)) {
    for (const componentInitializer of entityDefinition.components) {
      if (componentInitializer.definitionId === componentDefinition.id) {
        yield [entityDefinition, componentInitializer] as const;
      }
    }
  }
}
