import { SceneDefinition } from "./SceneDefinition";
import { DefinitionLibrary } from "./DefinitionLibrary";

export type SystemDefinition = {
  name: string;
  scenes: SceneDefinition[];
  /**
   * Entity and Component definitions being referenced by the Entity and Component initializers.
   */
  library: DefinitionLibrary;
};
