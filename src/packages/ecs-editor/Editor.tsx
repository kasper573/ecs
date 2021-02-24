import React, { useReducer } from "react";
import { Typography } from "@material-ui/core";
import {
  ComponentIcon,
  EntityIcon,
  PropertyIcon,
  SceneIcon,
  SystemIcon,
} from "./icons";
import { updateState } from "./mutations/updateState";
import { EditorState } from "./types/EditorState";
import { selectEditorObjects } from "./functions/selectEditorObjects";
import { EditorPanelContainer } from "./EditorPanelContainer";
import { CrudList } from "./CrudList";
import { useCrudDialogsFor } from "./useCrudDialogsFor";
import { AppBarAndDrawer } from "./AppBarAndDrawer";
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";
import { EditorTitle } from "./EditorTitle";
import { EditorScenePanel } from "./EditorScenePanel";

export type EditorProps = {
  defaultState?: Partial<EditorState>;
};

/**
 * Renders controls to CRUD systems, scenes, entities, components and properties.
 */
export const Editor = ({ defaultState }: EditorProps) => {
  const [state, dispatch] = useReducer(updateState, {
    ...createDefaultState(),
    ...defaultState,
  });
  const selected = selectEditorObjects(state);

  const [systemEvents, SystemDialogs] = useCrudDialogsFor("system", dispatch);
  const [sceneEvents, SceneDialogs] = useCrudDialogsFor("scene", dispatch);
  const [entityEvents, EntityDialogs] = useCrudDialogsFor("entity", dispatch);
  const [cmpEvents, CmpDialogs] = useCrudDialogsFor("component", dispatch);
  const [propEvents, PropDialogs] = useCrudDialogsFor("property", dispatch);

  return (
    <AppBarAndDrawer
      appBar={
        <>
          <EditorTitle>{selected.system?.name}</EditorTitle>
          <EditAndDeleteButtons
            name={selected.system?.name ?? ""}
            onEdit={() => systemEvents.onUpdateItem(selected.system)}
            onDelete={() => systemEvents.onDeleteItem(selected.system)}
          />
        </>
      }
      drawer={
        <CrudList
          name="system"
          active={selected.system}
          items={state.systems}
          onSelectItem={(system) => dispatch({ type: "SELECT_SYSTEM", system })}
          getItemProps={({ name }) => ({
            name,
            icon: SystemIcon,
            showEdit: false,
            showDelete: false,
          })}
        />
      }
    >
      <SystemDialogs />
      <SceneDialogs />
      <EntityDialogs />
      <CmpDialogs />
      <PropDialogs />
      <EditorPanelContainer>
        <EditorScenePanel>
          <Typography>This is the scene</Typography>
        </EditorScenePanel>
        <CrudList
          name="scene"
          active={selected.scene}
          items={selected.system?.scenes ?? []}
          getItemProps={({ name }) => ({ name, icon: SceneIcon })}
          onSelectItem={(scene) => dispatch({ type: "SELECT_SCENE", scene })}
          {...sceneEvents}
        />

        <CrudList
          name="entity"
          active={selected.entity}
          items={selected.scene?.entities ?? []}
          getItemProps={({ name }) => ({ name, icon: EntityIcon })}
          onSelectItem={(entity) => dispatch({ type: "SELECT_ENTITY", entity })}
          {...entityEvents}
        />

        <CrudList
          name="component"
          active={selected.component}
          items={selected.entity?.components ?? []}
          getItemProps={({ name }) => ({ name, icon: ComponentIcon })}
          onSelectItem={(component) =>
            dispatch({ type: "SELECT_COMPONENT", component })
          }
          {...cmpEvents}
        />

        <CrudList
          name="property"
          active={selected.property}
          items={selected.component?.properties ?? []}
          selectable={false}
          getItemProps={({ name }) => ({ name, icon: PropertyIcon })}
          onSelectItem={(property) =>
            dispatch({ type: "SELECT_PROPERTY", property })
          }
          {...propEvents}
        />
      </EditorPanelContainer>
    </AppBarAndDrawer>
  );
};

const createDefaultState = (): EditorState => ({
  selection: {
    system: 0,
    component: 0,
    entity: 0,
    property: 0,
    scene: 0,
  },
  systems: [],
});
