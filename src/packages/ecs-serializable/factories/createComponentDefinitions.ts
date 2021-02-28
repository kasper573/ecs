import { NativeComponents } from "../types/NativeComponents";
import { ComponentDefinitionId } from "../types/ComponentDefinition";
import { createComponentDefinition } from "./createComponentDefinition";

export const createComponentDefinitions = <
  AvailableComponents extends NativeComponents
>(
  availableComponents: AvailableComponents
) =>
  Object.keys(availableComponents).map((name) =>
    createComponentDefinition<AvailableComponents, keyof AvailableComponents>({
      name,
      nativeComponent: name,
      id: name as ComponentDefinitionId,
    })
  );
