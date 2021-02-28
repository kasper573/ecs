import { SystemDefinition } from "./types/SystemDefinition";
import { SceneDefinition } from "./types/SceneDefinition";
import { EntityDefinition } from "./types/EntityDefinition";
import {
  ComponentDefinition,
  ComponentDefinitionId,
} from "./types/ComponentDefinition";
import { EntityInitializer } from "./types/EntityInitializer";
import { ComponentInitializer } from "./types/ComponentInitializer";
import { NativeComponents } from "./types/NativeComponents";
import { ComponentOptionsDefinition } from "./types/ComponentOptionsDefinition";
import { serializeJS } from "./jsSerializer";

export const createSystemDefinition = <
  AvailableComponents extends NativeComponents
>(
  props: PartialFor<
    SystemDefinition<AvailableComponents>,
    "scenes" | "library"
  >,
  availableComponents: AvailableComponents
): SystemDefinition<AvailableComponents> => ({
  scenes: [],
  library: {
    entities: props.library?.entities ?? [],
    components: createComponentDefinitions(availableComponents),
  },
  ...props,
});

export const createSceneDefinition = (
  props: PartialFor<SceneDefinition, "entities">
): SceneDefinition => ({
  entities: [],
  ...props,
});

export const createEntityInitializer = (
  props: EntityInitializer
): EntityInitializer => ({
  ...props,
});

export const createEntityDefinition = (
  props: PartialFor<EntityDefinition, "components">
): EntityDefinition => ({
  components: [],
  ...props,
});

export const createComponentInitializer = (
  props: ComponentInitializer
): ComponentInitializer => ({
  ...props,
});

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

export const createComponentDefinition = <
  AvailableComponents extends NativeComponents,
  NativeComponentName extends keyof AvailableComponents
>(
  props: ComponentDefinition<AvailableComponents, NativeComponentName>
): ComponentDefinition<AvailableComponents, NativeComponentName> => ({
  ...props,
});

export const createComponentOptionsDefinition = (options: any) =>
  serializeJS(options) as ComponentOptionsDefinition;

export const createProperty = (name: string, value: string) => ({
  name,
  value,
});
