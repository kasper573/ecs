import { createAction, createReducer } from "@reduxjs/toolkit";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";
import { set, values } from "../../nominal";
import { uuid } from "../functions/uuid";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { createEditorState } from "../functions/createEditorState";
import { EditorState } from "../types/EditorState";

export const ensureNativeComponentsAction = createAction<
  NativeComponents,
  "ensureNativeComponents"
>("ensureNativeComponents");

export const ensureNativeComponents = createReducer(
  createEditorState(),
  (builder) =>
    builder.addCase(
      ensureNativeComponentsAction,
      (state, { payload: nativeComponents }) => {
        const {
          ecs: { library, systems },
        } = state as EditorState;

        const libraryNodeList = values(library);

        for (const system of values(systems)) {
          for (const nativeComponentName of Object.keys(nativeComponents)) {
            const hasComponent = libraryNodeList.find(
              (node) =>
                node.systemId === system.id &&
                node.type === "component" &&
                node.component.nativeComponent === nativeComponentName
            );
            if (hasComponent) {
              continue;
            }
            const node: LibraryNode = {
              id: uuid(),
              type: "component",
              systemId: system.id,
              component: {
                name: nativeComponentName,
                nativeComponent: nativeComponentName,
                id: uuid(),
              },
            };
            set(library, node.id, node);
          }
        }
      }
    )
);
