import { values } from "../../ecs-common/nominal";
import { EditorState } from "../types/EditorState";
import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { SceneDefinitionId } from "../../ecs-serializable/types/SceneDefinition";

export const selectListOfEntityInitializer = createMemoizedSelector(
  (
    state: EditorState,
    forSceneId: SceneDefinitionId | undefined = state.selection.scene
  ) => [state.ecs.entityInitializers, forSceneId] as const,
  ([entityInitializers, forSceneId]) =>
    values(entityInitializers).filter((entity) => entity.sceneId === forSceneId)
);
