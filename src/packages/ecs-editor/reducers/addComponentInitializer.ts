import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { get, values } from "../../ecs-common/nominal";
import { inheritComponentInitializer } from "../../ecs-serializable/functions/inheritComponentInitializer";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentInitializerReducerPayload } from "../types/ComponentInitializerReducerPayload";

type AddComponentInitializerPayload = ComponentInitializerReducerPayload<{
  component: ComponentInitializer;
}>;

export const addComponentInitializer = createEditorStateReducer<AddComponentInitializerPayload>(
  (state, { payload }) => {
    const {
      ecs: { entityInitializers, entityDefinitions },
    } = state;
    switch (payload.target) {
      case "initializer":
        const init = get(entityInitializers, payload.id);
        if (!init) {
          throw new Error("Could not find entity initializer");
        }
        init.components.push(inheritComponentInitializer(payload.component));
        break;
      case "definition":
        const def = get(entityDefinitions, payload.id);
        if (!def) {
          throw new Error("Could not find entity definition");
        }
        def.components.push(payload.component);
        for (const init of values(state.ecs.entityInitializers).filter(
          (init) => init.definitionId === def.id
        )) {
          init.components.push(payload.component);
        }
        break;
    }
  }
);
