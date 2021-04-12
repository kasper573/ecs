import { uuid } from "../../ecs-common/uuid";
import { ComponentDefinition } from "../../ecs-serializable/definition/ComponentDefinition";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";

export const ensureNativeComponents = createEditorStateReducer<NativeComponents>(
  (
    { ecs: { componentDefinitions, systems } },
    { payload: nativeComponents }
  ) => {
    const componentDefinitionList = Object.values(componentDefinitions);
    for (const system of Object.values(systems)) {
      for (const nativeComponentName of Object.keys(nativeComponents)) {
        const hasComponent = componentDefinitionList.find(
          (component) =>
            component.systemId === system.id &&
            component.nativeComponent === nativeComponentName
        );
        if (hasComponent) {
          continue;
        }
        const component: ComponentDefinition = {
          nodeId: uuid(),
          id: uuid(),
          systemId: system.id,
          name: nativeComponentName,
          nativeComponent: nativeComponentName,
        };
        componentDefinitions[component.id] = component;
      }
    }
  }
);
