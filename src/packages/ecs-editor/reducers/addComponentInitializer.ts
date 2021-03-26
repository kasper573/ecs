import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { get } from "../../nominal";
import { inheritComponentInitializer } from "../../ecs-serializable/factories/inheritComponentInitializer";
import { selectEntityInitializersFor } from "../selectors/selectEntityInitializersFor";
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
        for (const init of selectEntityInitializersFor(state, def)) {
          init.components.push(payload.component);
        }
        break;
    }
  }
);
