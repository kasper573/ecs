import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { ComponentDefinitionEditor } from "./ComponentDefinitionEditor";
import {
  EntityDefinitionEditor,
  EntityDefinitionEditorProps,
} from "./EntityDefinitionEditor";
import { LibraryFolderEditor } from "./LibraryFolderEditor";

export type LibraryNodeEditorProps = {
  value: LibraryNode;
  onChange: (updated: LibraryNode) => void;
} & Pick<EntityDefinitionEditorProps, "componentDefinitions">;

export const LibraryNodeEditor = ({
  value,
  componentDefinitions,
  onChange,
}: LibraryNodeEditorProps) => {
  switch (value?.type) {
    case "component":
      return <ComponentDefinitionEditor value={value.component} />;
    case "entity":
      return (
        <EntityDefinitionEditor
          value={value.entity}
          componentDefinitions={componentDefinitions}
          onChange={(entity) => onChange({ ...value, entity })}
        />
      );
    case "folder":
      return <LibraryFolderEditor value={value} />;
  }
  return null;
};
