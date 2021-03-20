import { LibraryDefinition } from "../types/LibraryDefinition";
import { EntityDefinitionId } from "../types/EntityDefinition";
import { getDefinitionsInLibrary } from "./getDefinitionsInLibrary";

export const getEntityDefinitionInLibrary = (
  library: LibraryDefinition,
  id: EntityDefinitionId
) => getDefinitionsInLibrary(library).entities.find((def) => def.id === id);
