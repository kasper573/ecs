import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { ComponentInitializerId } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentInitializerReducerPayload } from "../types/ComponentInitializerReducerPayload";
import { getTargetComponent } from "./setComponentInitializerProperty";

type setComponentPropertyPayload = ComponentInitializerReducerPayload<{
  componentId: ComponentInitializerId;
  propertyName: string;
}>;

export const resetComponentInitializerProperty = createEditorStateReducer<setComponentPropertyPayload>(
  (state, { payload }) => {
    delete getTargetComponent(state, payload).properties[payload.propertyName];
  }
);
