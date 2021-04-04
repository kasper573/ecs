import { EditorState } from "../types/EditorState";
import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";

export const selectListOfSceneDefinition = createMemoizedSelector(
  (
    state: EditorState,
    forSystemId: SystemDefinitionId | undefined = state.selection.system
  ) => [state.ecs.scenes, forSystemId] as const,
  ([scenes, forSystemId]) =>
    Object.values(scenes).filter((scene) => scene.systemId === forSystemId)
);
