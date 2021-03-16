import { InspectedObject } from "../types/InspectedObject";
import { EntityInitializerEditor } from "./EntityInitializerEditor";
import { LibraryNodeEditor } from "./LibraryNodeEditor";

export type InspectedObjectEditorProps = {
  value?: InspectedObject;
};

export const InspectedObjectEditor = ({
  value,
}: InspectedObjectEditorProps) => {
  switch (value?.type) {
    case "entityInitializer":
      return <EntityInitializerEditor value={value.object} />;
    case "libraryNode":
      return <LibraryNodeEditor value={value?.object} />;
  }
  return null;
};
