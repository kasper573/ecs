import { SceneDefinition } from "../types/SceneDefinition";

export const createSceneDefinition = (
  props: SceneDefinition
): SceneDefinition => ({
  ...props,
});
