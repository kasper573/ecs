import React, { useReducer } from "react";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { TextSystem } from "../ecs-react/TextSystem";
import {
  ComponentIcon,
  EntityIcon,
  PropertyIcon,
  ResetIcon,
  SceneIcon,
  SystemIcon,
} from "./icons";
import { updateState } from "./mutations/updateState";
import { EditorState } from "./types/EditorState";
import { selectEditorObjects } from "./functions/selectEditorObjects";
import { EditorPanelContainer } from "./EditorPanelContainer";
import { CrudList } from "./CrudList";
import { useCrudDialogsFor } from "./hooks/useCrudDialogsFor";
import { AppBarAndDrawer } from "./AppBarAndDrawer";
import { EditAndDeleteButtons } from "./EditAndDeleteButtons";
import { EditorTitle } from "./EditorTitle";
import { EditorPanel } from "./EditorPanel";
import { EditorPanelName } from "./EditorPanelName";
import { EditorFlatPanel } from "./EditorFlatPanel";
import { useSystemInitializer } from "./hooks/useSystemInitializer";

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
  const [system, resetSystem] = useSystemInitializer(selected);

  const [systemEvents, SystemDialogs] = useCrudDialogsFor("system", dispatch);
  const [sceneEvents, SceneDialogs] = useCrudDialogsFor("scene", dispatch);
  const [entityEvents, EntityDialogs] = useCrudDialogsFor("entity", dispatch);
  const [cmpEvents, CmpDialogs] = useCrudDialogsFor("component", dispatch);
  const [propEvents, PropDialogs] = useCrudDialogsFor("property", dispatch);

  const appBar = (
    <>
      <EditorTitle>{selected.system?.name}</EditorTitle>
      <Tooltip title="Reset system" onClick={resetSystem}>
        <IconButton aria-label="reset system">
          <ResetIcon />
        </IconButton>
      </Tooltip>
      <EditAndDeleteButtons
        name={selected.system?.name ?? ""}
        onEdit={() => systemEvents.onUpdateItem(selected.system)}
        onDelete={() => systemEvents.onDeleteItem(selected.system)}
      />
    </>
  );

  const drawer = (
    <CrudList
      title="Systems"
      noun="System"
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
        <EditorFlatPanel>
          <Typography>
            {state.systems.length > 0
              ? "Please select a system"
              : "Please create a system"}
          </Typography>
        </EditorFlatPanel>
      </AppBarAndDrawer>
    );
  }

  return (
    <AppBarAndDrawer appBar={appBar} drawer={drawer}>
      {dialogs}
      <EditorPanelContainer>
        {selected.scene && (
          <EditorFlatPanel title="Scene">
            {system && <TextSystem system={system} />}
          </EditorFlatPanel>
        )}
        <EditorPanel title="Instances" name={EditorPanelName.Instances}>
          Instances
        </EditorPanel>
        <EditorPanel title="Scenes" name={EditorPanelName.Scenes}>
          <CrudList
            title={EditorPanelName.Scenes}
            noun="scene"
            active={selected.scene}
            items={selected.system?.scenes ?? []}
            getItemProps={({ name }) => ({ name, icon: SceneIcon })}
            onSelectItem={(scene) => dispatch({ type: "SELECT_SCENE", scene })}
            {...sceneEvents}
          />
        </EditorPanel>
        <EditorPanel title="Library" name={EditorPanelName.Library}>
          <CrudList
            title={EditorPanelName.Library}
            noun="entity"
            active={selected.entity}
            items={selected.scene?.entities ?? []}
            getItemProps={({ name }) => ({ name, icon: EntityIcon })}
            onSelectItem={(entity) =>
              dispatch({ type: "SELECT_ENTITY", entity })
            }
            {...entityEvents}
          />
          <CrudList
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
            title={EditorPanelName.Inspector}
            noun="property"
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
