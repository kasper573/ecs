import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../types/PanelName";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { FolderIcon } from "../components/icons";
import { LibraryFolder } from "../../ecs-serializable/types/LibraryFolder";

export type LibraryFolderEditorProps = { value: LibraryFolder };

export const LibraryFolderEditor = ({ value }: LibraryFolderEditorProps) => (
  <>
    <PanelHeader title={PanelName.Inspector} />
    <InspectedObjectInfo icon={<FolderIcon />} name={value.name} />
  </>
);
