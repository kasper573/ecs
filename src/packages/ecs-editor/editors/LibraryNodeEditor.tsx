import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { ComponentDefinitionEditor } from "./ComponentDefinitionEditor";
import { EntityDefinitionEditor } from "./EntityDefinitionEditor";
import { LibraryFolderEditor } from "./LibraryFolderEditor";

export type LibraryNodeEditorProps = { value: LibraryNode };

export const LibraryNodeEditor = ({ value }: LibraryNodeEditorProps) => {
  switch (value?.type) {
    case "component":
      return <ComponentDefinitionEditor value={value.component} />;
    case "entity":
      return <EntityDefinitionEditor value={value.entity} />;
    case "folder":
      return <LibraryFolderEditor value={value} />;
  }
  return null;
};
