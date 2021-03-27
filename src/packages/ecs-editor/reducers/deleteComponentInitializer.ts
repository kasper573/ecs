import { get } from "../../ecs-common/nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import {
  ComponentInitializer,
  ComponentInitializerId,
} from "../../ecs-serializable/types/ComponentInitializer";
import { selectEntityInitializersFor } from "../selectors/selectEntityInitializersFor";
import { ComponentInitializerReducerPayload } from "../types/ComponentInitializerReducerPayload";

type DeleteComponentInitializerPayload = ComponentInitializerReducerPayload<{
  componentId: ComponentInitializerId;
}>;

export const deleteComponentInitializer = createEditorStateReducer<DeleteComponentInitializerPayload>(
  (state, { payload }) => {
    const {
      ecs: { entityInitializers, entityDefinitions },
    } = state;
    switch (payload.target) {
      case "initializer":
        const init = get(entityInitializers, payload.id);
        if (!init) {
          throw new Error(`Could not find target entity initializer`);
        }
        if (!removeComponent(init.components, payload.componentId)) {
          throw new Error(
            "Could not remove component from target entity initializer"
          );
        }
        break;
      case "definition":
        const def = get(entityDefinitions, payload.id);
        if (!def) {
          throw new Error(`Could not find target entity definition`);
        }
        if (!removeComponent(def.components, payload.componentId)) {
          throw new Error(
            "Could not remove component from target entity definition"
          );
        }
        for (const init of selectEntityInitializersFor(state, def)) {
          removeComponent(init.components, payload.componentId);
        }
        break;
    }
  }
);

const removeComponent = (
  components: ComponentInitializer[],
  removeId: ComponentInitializerId
) => {
  const index = components.findIndex((comp) => comp.id === removeId);
  if (index !== -1) {
    components.splice(index, 1);
    return true;
  }
  return false;
};
