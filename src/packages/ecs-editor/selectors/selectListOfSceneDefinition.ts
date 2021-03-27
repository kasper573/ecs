import { values } from "../../ecs-common/nominal";
import { EditorState } from "../types/EditorState";
import { createShallowSelector } from "../functions/createShallowSelector";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";

export const selectListOfSceneDefinition = createShallowSelector(
  (
    state: EditorState,
    forSystemId: SystemDefinitionId | undefined = state.selection.system
  ) => [state.ecs.scenes, forSystemId] as const,
  ([scenes, forSystemId]) =>
    values(scenes).filter((scene) => scene.systemId === forSystemId)
);
