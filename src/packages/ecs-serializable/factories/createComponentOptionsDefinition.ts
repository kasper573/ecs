import { serializeJS } from "../jsSerializer";
import { ComponentOptionsDefinition } from "../types/ComponentOptionsDefinition";

export const createComponentOptionsDefinition = (options: any) =>
  serializeJS(options) as ComponentOptionsDefinition;
