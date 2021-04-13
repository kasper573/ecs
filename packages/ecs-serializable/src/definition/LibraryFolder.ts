import { NominalString } from "../../../ecs-common/src/NominalString";
import { LibraryNode } from "./LibraryNode";

export type LibraryFolderId = NominalString<"LibraryFolderId">;

export type LibraryFolder = LibraryNode & {
  /**
   * uuid
   */
  id: LibraryFolderId;
};
