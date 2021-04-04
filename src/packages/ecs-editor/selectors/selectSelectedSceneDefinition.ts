import { EditorState } from "../types/EditorState";

export const selectSelectedSceneDefinition = ({
  selection,
  ecs: { scenes },
}: EditorState) => (selection.scene ? scenes[selection.scene] : undefined);
