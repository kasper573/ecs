import { LibraryNode } from "./LibraryNode";

export type LibraryFolderId = NominalString<"LibraryFolderId">;

export type LibraryFolder = LibraryNode & {
  /**
   * uuid
   */
  id: LibraryFolderId;
};
