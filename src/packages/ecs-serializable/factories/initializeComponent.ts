import { Component } from "../../ecs/Component";
import { ComponentInitializer } from "../types/ComponentInitializer";
import { createComponentProperties } from "./createComponentProperties";

export const initializeComponent = <C extends Component>(
  Component: C,
  initializer: ComponentInitializer
) => {
  const instance = new Component();
  instance.configure({
    id: initializer.id,
    ...createComponentProperties(initializer.properties),
  });
  return instance;
};
