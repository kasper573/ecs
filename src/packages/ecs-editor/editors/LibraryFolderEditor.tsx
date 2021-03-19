import { LibraryFolderNode } from "../../ecs-serializable/types/LibraryNode";
import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../components/PanelName";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { FolderIcon } from "../components/icons";

export type LibraryFolderEditorProps = { value: LibraryFolderNode };

export const LibraryFolderEditor = ({ value }: LibraryFolderEditorProps) => (
  <>
    <PanelHeader title={PanelName.Inspector} />
    <InspectedObjectInfo icon={<FolderIcon />} name={value.name} />
  </>
);
