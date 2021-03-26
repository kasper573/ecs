import { EditorState } from "../types/EditorState";
import { selectListOfLibraryFolder } from "./selectListOfLibraryFolder";
import { selectListOfEntityDefinition } from "./selectListOfEntityDefinition";
import { selectListOfComponentDefinition } from "./selectListOfComponentDefinition";

export const selectListOfLibraryNode = (state: EditorState) => {
  return [
    ...selectListOfEntityDefinition(state).map((obj) => ({
      ...obj,
      type: "entity" as const,
    })),
    ...selectListOfComponentDefinition(state).map((obj) => ({
      ...obj,
      type: "component" as const,
    })),
    ...selectListOfLibraryFolder(state).map((obj) => ({
      ...obj,
      type: "folder" as const,
    })),
  ];
};
