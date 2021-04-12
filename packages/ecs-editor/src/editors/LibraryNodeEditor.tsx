import { TypedLibraryNode } from "../types/TypedLibraryNode";
import { ComponentDefinitionEditor } from "./ComponentDefinitionEditor";
import { EntityDefinitionEditor } from "./EntityDefinitionEditor";
import { LibraryFolderEditor } from "./LibraryFolderEditor";

export type LibraryNodeEditorProps = {
  value: TypedLibraryNode;
};

export const LibraryNodeEditor = ({ value }: LibraryNodeEditorProps) => {
  switch (value?.type) {
    case "component":
      return <ComponentDefinitionEditor value={value} />;
    case "entity":
      return <EntityDefinitionEditor value={value} />;
    case "folder":
      return <LibraryFolderEditor value={value} />;
  }
  return null;
};
