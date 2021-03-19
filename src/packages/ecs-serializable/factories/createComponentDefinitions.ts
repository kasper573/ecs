import { NativeComponents } from "../types/NativeComponents";
import { ComponentDefinitionId } from "../types/ComponentDefinition";
import { createComponentDefinition } from "./createComponentDefinition";

export const createComponentDefinitions = (
  nativeComponents: NativeComponents
) =>
  Object.keys(nativeComponents).map((name) =>
    createComponentDefinition({
      name,
      nativeComponent: name,
      id: name as ComponentDefinitionId,
    })
  );
