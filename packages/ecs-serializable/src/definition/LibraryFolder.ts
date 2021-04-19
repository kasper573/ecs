import * as zod from "zod";
import { NominalString } from "../../../ecs-common/src/NominalString";
import { genericString } from "../../../zod-extensions/genericString";
import { libraryNodeSchema } from "./LibraryNode";

export type LibraryFolderId = NominalString<"LibraryFolderId">;

export type LibraryFolder = zod.infer<typeof libraryFolderSchema>;

export const libraryFolderIdSchema = genericString<LibraryFolderId>();

export const libraryFolderSchema = libraryNodeSchema.merge(
  zod.object({
    id: libraryFolderIdSchema,
  })
);
