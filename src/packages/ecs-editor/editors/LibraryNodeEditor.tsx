import { DiscriminatedLibraryNode } from "../types/DiscriminatedLibraryNode";
import { ComponentDefinitionEditor } from "./ComponentDefinitionEditor";
import { EntityDefinitionEditor } from "./EntityDefinitionEditor";
import { LibraryFolderEditor } from "./LibraryFolderEditor";

export type LibraryNodeEditorProps = {
  value: DiscriminatedLibraryNode;
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
