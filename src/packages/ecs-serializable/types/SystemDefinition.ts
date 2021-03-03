import { SceneDefinition } from "./SceneDefinition";
import { LibraryDefinition } from "./LibraryDefinition";

export type SystemDefinitionId = Nominal<string, "SystemDefinitionId">;

export type SystemDefinition = {
  id: SystemDefinitionId;
  name: string;
  scenes: SceneDefinition[];
  library: LibraryDefinition;
};
