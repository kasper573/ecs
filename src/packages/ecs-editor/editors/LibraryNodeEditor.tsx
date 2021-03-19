import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { ComponentDefinitionEditor } from "./ComponentDefinitionEditor";
import { EntityDefinitionEditor } from "./EntityDefinitionEditor";
import { LibraryFolderEditor } from "./LibraryFolderEditor";

export type LibraryNodeEditorProps = {
  value: LibraryNode;
  onChange: (updated: LibraryNode) => void;
};

export const LibraryNodeEditor = ({
  value,
  onChange,
}: LibraryNodeEditorProps) => {
  switch (value?.type) {
    case "component":
      return <ComponentDefinitionEditor value={value.component} />;
    case "entity":
      return (
        <EntityDefinitionEditor
          value={value.entity}
          onChange={(entity) => onChange({ ...value, entity })}
        />
      );
    case "folder":
      return <LibraryFolderEditor value={value} />;
  }
  return null;
};
