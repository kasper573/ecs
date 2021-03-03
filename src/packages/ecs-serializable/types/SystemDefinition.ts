import { SceneDefinition } from "./SceneDefinition";
import { LibraryDefinition } from "./LibraryDefinition";

export type SystemDefinition = {
  name: string;
  scenes: SceneDefinition[];
  library: LibraryDefinition;
};
