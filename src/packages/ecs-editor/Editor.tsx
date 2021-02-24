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
import { EditorPanel } from "./EditorPanel";
import { EditorPanelName } from "./EditorPanelName";
import { EditorPanelFlat } from "./EditorPanelFlat";

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

  const appBar = (
    <>
      <EditorTitle>{selected.system?.name}</EditorTitle>
      <EditAndDeleteButtons
        name={selected.system?.name ?? ""}
        onEdit={() => systemEvents.onUpdateItem(selected.system)}
        onDelete={() => systemEvents.onDeleteItem(selected.system)}
      />
    </>
  );

  const drawer = (
    <CrudList
      name="system"
      active={selected.system}
      items={state.systems}
      onSelectItem={(system) => dispatch({ type: "SELECT_SYSTEM", system })}
      onCreateItem={systemEvents.onCreateItem}
      getItemProps={({ name }) => ({
        name,
        icon: SystemIcon,
        showEdit: false,
        showDelete: false,
      })}
    />
  );

  const dialogs = (
    <>
      <SystemDialogs />
      <SceneDialogs />
      <EntityDialogs />
      <CmpDialogs />
      <PropDialogs />
    </>
  );

  if (!selected.system) {
    return (
      <AppBarAndDrawer
        appBar={<Typography>No system selected</Typography>}
        drawer={drawer}
      >
        {dialogs}
        <EditorPanelFlat>
          <Typography>
            {state.systems.length > 0
              ? "Please select a system"
              : "Please create a system"}
          </Typography>
        </EditorPanelFlat>
      </AppBarAndDrawer>
    );
  }

  return (
    <AppBarAndDrawer appBar={appBar} drawer={drawer}>
      {dialogs}
      <EditorPanelContainer>
        {selected.scene && (
          <EditorScenePanel title="Scene">
            <Typography>{selected.scene.name}</Typography>
          </EditorScenePanel>
        )}
        <EditorPanel title="Instances" name={EditorPanelName.Instances}>
          Instances
        </EditorPanel>
        <EditorPanel title="Scenes" name={EditorPanelName.Scenes}>
          <CrudList
            name="scene"
            active={selected.scene}
            items={selected.system?.scenes ?? []}
            getItemProps={({ name }) => ({ name, icon: SceneIcon })}
            onSelectItem={(scene) => dispatch({ type: "SELECT_SCENE", scene })}
            {...sceneEvents}
          />
        </EditorPanel>
        <EditorPanel title="Library" name={EditorPanelName.Library}>
          <CrudList
            name="entity"
            active={selected.entity}
            items={selected.scene?.entities ?? []}
            getItemProps={({ name }) => ({ name, icon: EntityIcon })}
            onSelectItem={(entity) =>
              dispatch({ type: "SELECT_ENTITY", entity })
            }
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
        </EditorPanel>
        <EditorPanel title="Inspector" name={EditorPanelName.Inspector}>
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
        </EditorPanel>
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
