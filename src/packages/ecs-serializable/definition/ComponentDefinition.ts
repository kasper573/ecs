import { NativeComponentName } from "../types/NativeComponents";
import { LibraryNode } from "./LibraryNode";

export type ComponentDefinitionId = NominalString<"ComponentDefinitionId">;

export type ComponentDefinition = LibraryNode & {
  /**
   * Automatically generated id (unique within parent System).
   */
  id: ComponentDefinitionId;
  /**
   * The native component that will be used
   */
  nativeComponent: NativeComponentName;
};
