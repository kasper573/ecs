import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";

export const selectListOfSceneDefinition = (
  state: EditorState,
  forSystemId = state.selection.system
) => values(state.ecs.scenes).filter((scene) => scene.systemId === forSystemId);
