import { LibraryFolderNode } from "../../ecs-serializable/types/LibraryNode";

export type LibraryFolderEditorProps = { value: LibraryFolderNode };

export const LibraryFolderEditor = ({ value }: LibraryFolderEditorProps) => (
  <>LibraryFolderEditor: {value.name}</>
);
