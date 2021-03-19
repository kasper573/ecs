import { ComponentDefinition } from "../types/ComponentDefinition";

export const createComponentDefinition = (
  props: ComponentDefinition
): ComponentDefinition => ({
  ...props,
});
