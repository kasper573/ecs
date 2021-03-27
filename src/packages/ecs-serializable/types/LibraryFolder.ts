import { LibraryNode } from "./LibraryNode";

export type LibraryFolderId = Nominal<string, "LibraryFolderId">;

export type LibraryFolder = LibraryNode & {
  /**
   * uuid
   */
  id: LibraryFolderId;
};
