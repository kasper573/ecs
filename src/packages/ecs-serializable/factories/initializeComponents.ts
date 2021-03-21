import { ComponentInitializer } from "../types/ComponentInitializer";
import { ComponentMap } from "../types/ComponentMap";
import { initializeComponent } from "./initializeComponent";

export const initializeComponents = (
  constructors: ComponentMap,
  initializers: ComponentInitializer[]
) =>
  initializers.map((initializer) => {
    const component = constructors.get(initializer.definitionId);
    if (!component) {
      throw new Error(
        `No Component with definitionId "${initializer.definitionId}" exists`
      );
    }
    return initializeComponent(component, initializer);
  });
