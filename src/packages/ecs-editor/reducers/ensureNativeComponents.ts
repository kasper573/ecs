import { set, values } from "../../nominal";
import { uuid } from "../functions/uuid";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const ensureNativeComponents = createEditorStateReducer(
  ({ ecs: { componentDefinitions, systems }, nativeComponents }) => {
    const componentDefinitionList = values(componentDefinitions);
    for (const system of values(systems)) {
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
        set(componentDefinitions, component.id, component);
      }
    }
  }
);
