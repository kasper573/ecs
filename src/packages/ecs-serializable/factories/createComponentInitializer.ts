import { ComponentInitializer } from "../types/ComponentInitializer";

export const createComponentInitializer = (
  props: ComponentInitializer
): ComponentInitializer => ({
  ...props,
});
