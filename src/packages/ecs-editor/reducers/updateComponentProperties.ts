import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { get } from "../../nominal";
import { ComponentInitializerId } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentInitializerReducerPayload } from "../types/ComponentInitializerReducerPayload";
import { ComponentPropertiesDefinition } from "../../ecs-serializable/types/ComponentPropertiesDefinition";

type UpdateComponentPropertiesPayload = ComponentInitializerReducerPayload<{
  componentId: ComponentInitializerId;
  properties: ComponentPropertiesDefinition;
}>;

export const updateComponentProperties = createEditorStateReducer<UpdateComponentPropertiesPayload>(
  (state, { payload }) => {
    const {
      ecs: { entityInitializers, entityDefinitions },
    } = state;
    let target;
    switch (payload.target) {
      case "initializer":
        target = get(entityInitializers, payload.id);
        break;
      case "definition":
        target = get(entityDefinitions, payload.id);
        break;
    }
    if (!target) {
      throw new Error(`Could not find target entity ${payload.target}`);
    }
    const targetComponent = target.components.find(
      (comp) => comp.id === payload.componentId
    );
    if (!targetComponent) {
      throw new Error(
        `Could not find component in target entity ${payload.target}`
      );
    }
    targetComponent.properties = payload.properties;
  }
);
