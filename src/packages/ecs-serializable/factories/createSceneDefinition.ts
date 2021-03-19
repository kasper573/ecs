import { SceneDefinition } from "../types/SceneDefinition";

export const createSceneDefinition = (
  props: PartialFor<SceneDefinition, "entities">
): SceneDefinition => ({
  entities: [],
  ...props,
});
