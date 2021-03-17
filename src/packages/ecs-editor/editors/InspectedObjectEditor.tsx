import { InspectedObject } from "../types/InspectedObject";
import { EntityInitializerEditor } from "./EntityInitializerEditor";
import { LibraryNodeEditor, LibraryNodeEditorProps } from "./LibraryNodeEditor";

export type InspectedObjectEditorProps = {
  value: InspectedObject;
  onChange: (updated: InspectedObject, current: InspectedObject) => void;
} & Pick<LibraryNodeEditorProps, "componentDefinitions">;

export const InspectedObjectEditor = ({
  value,
  componentDefinitions,
  onChange,
}: InspectedObjectEditorProps) => {
  switch (value?.type) {
    case "entityInitializer":
      return <EntityInitializerEditor value={value.object} />;
    case "libraryNode":
      return (
        <LibraryNodeEditor
          componentDefinitions={componentDefinitions}
          value={value?.object}
          onChange={(object) => onChange({ ...value, object }, value)}
        />
      );
  }
  return null;
};
