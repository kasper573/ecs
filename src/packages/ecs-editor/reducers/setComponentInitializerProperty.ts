import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { get } from "../../ecs-common/nominal";
import { ComponentInitializerId } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentInitializerReducerPayload } from "../types/ComponentInitializerReducerPayload";
import { ComponentPropertyValueDefinition } from "../../ecs-serializable/types/ComponentPropertiesDefinition";
import { EditorState } from "../types/EditorState";

type setComponentPropertyPayload = ComponentInitializerReducerPayload<{
  componentId: ComponentInitializerId;
  propertyName: string;
  propertyValue: ComponentPropertyValueDefinition;
}>;

export const setComponentInitializerProperty = createEditorStateReducer<setComponentPropertyPayload>(
  (state, { payload }) => {
    getTargetComponent(state, payload).properties[payload.propertyName] =
      payload.propertyValue;
  }
);

export const getTargetComponent = (
  { ecs: { entityInitializers, entityDefinitions } }: EditorState,
  payload: ComponentInitializerReducerPayload<{
    componentId: ComponentInitializerId;
  }>
) => {
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
  return targetComponent;
};
