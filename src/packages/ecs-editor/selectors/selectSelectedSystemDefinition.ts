import { EditorState } from "../types/EditorState";

export const selectSelectedSystemDefinition = ({
  selection,
  ecs: { systems },
}: EditorState) => (selection.system ? systems[selection.system] : undefined);
