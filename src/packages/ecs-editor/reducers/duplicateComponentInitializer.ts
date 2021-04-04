import { createEditorStateReducer } from "../functions/createEditorStateReducer";

import {
  ComponentInitializer,
  ComponentInitializerId,
} from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentInitializerReducerPayload } from "../types/ComponentInitializerReducerPayload";
import { core } from "../core";
import { EditorState } from "../types/EditorState";
import { uuid } from "../../ecs-common/uuid";
import { addComponentInitializer } from "./addComponentInitializer";

type DuplicateComponentInitializerPayload = ComponentInitializerReducerPayload<{
  componentId: ComponentInitializerId;
}>;

export const duplicateComponentInitializer = createEditorStateReducer<DuplicateComponentInitializerPayload>(
  (state, { payload }) => {
    const component = findComponentInitializer(state, payload);
    if (!component) {
      throw new Error("Could not find component initializer to duplicate");
    }
    const duplicate: ComponentInitializer = {
      ...component,
      id: uuid(),
    };
    addComponentInitializer(
      state,
      core.actions.addComponentInitializer({
        ...payload,
        component: duplicate,
      })
    );
  }
);

const findComponentInitializer = (
  { ecs: { entityInitializers, entityDefinitions } }: EditorState,
  payload: DuplicateComponentInitializerPayload
) => {
  switch (payload.target) {
    case "initializer":
      return entityInitializers[payload.id]?.components.find(
        (c) => c.id === payload.componentId
      );
    case "definition":
      return entityDefinitions[payload.id]?.components.find(
        (c) => c.id === payload.componentId
      );
  }
};
