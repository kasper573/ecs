import { InspectedObject } from "../types/InspectedObject";
import { EntityInitializerEditor } from "./EntityInitializerEditor";
import { LibraryNodeEditor } from "./LibraryNodeEditor";

export type InspectedObjectEditorProps = {
  value: InspectedObject;
  onChange: (updated: InspectedObject, current: InspectedObject) => void;
};

export const InspectedObjectEditor = ({
  value,
  onChange,
}: InspectedObjectEditorProps) => {
  switch (value?.type) {
    case "entityInitializer":
      return (
        <EntityInitializerEditor
          value={value.object}
          onChange={(object) => onChange({ ...value, object }, value)}
        />
      );
    case "libraryNode":
      return (
        <LibraryNodeEditor
          value={value?.object}
          onChange={(object) => onChange({ ...value, object }, value)}
        />
      );
  }
  return null;
};
