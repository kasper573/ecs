import {
  ComponentProperties,
  ComponentPropertiesDefinition,
} from "../types/ComponentPropertiesDefinition";
import { createComponentPropertyDefinition } from "./createComponentPropertyDefinition";

export const createComponentPropertiesDefinition = (
  props: ComponentProperties
) =>
  Object.keys(props).reduce(
    (definition, propertyName) => ({
      ...definition,
      [propertyName]: createComponentPropertyDefinition(props[propertyName]),
    }),
    {} as ComponentPropertiesDefinition
  );
