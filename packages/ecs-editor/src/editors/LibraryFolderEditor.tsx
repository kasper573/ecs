import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { FolderIcon } from "../components/icons";
import { LibraryFolder } from "../../../ecs-serializable/src/definition/LibraryFolder";
import { InspectorPanelHeader } from "../components/InspectorPanelHeader";

export type LibraryFolderEditorProps = { value: LibraryFolder };

export const LibraryFolderEditor = ({ value }: LibraryFolderEditorProps) => (
  <>
    <InspectorPanelHeader />
    <InspectedObjectInfo icon={<FolderIcon />} name={value.name} />
  </>
);
