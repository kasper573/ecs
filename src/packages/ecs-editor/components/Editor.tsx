import React, { useReducer } from "react";
import { IconButton, List, Tooltip, Typography } from "@material-ui/core";
import { TextSystem } from "../../ecs-react/TextSystem";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import {
  EntityInitializer,
  EntityInitializerId,
} from "../../ecs-serializable/types/EntityInitializer";
import { createSystemDefinition } from "../../ecs-serializable/factories/createSystemDefinition";
import { createSceneDefinition } from "../../ecs-serializable/factories/createSceneDefinition";
import { createEntityInitializer } from "../../ecs-serializable/factories/createEntityInitializer";
import { createEntityDefinition } from "../../ecs-serializable/factories/createEntityDefinition";
import { rootReducer } from "../reducers/rootReducer";
import { EditorState } from "../types/EditorState";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { useSystemInitializer } from "../hooks/useSystemInitializer";
import { useSceneSync } from "../hooks/useSceneSync";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { uuid } from "../functions/uuid";
import { useEnsureSelection } from "../hooks/useEnsureSelection";
import {
  ComponentIcon,
  DeleteIcon,
  EditIcon,
  EntityDefinitionIcon,
  EntityInitializerIcon,
  ResetIcon,
  SceneIcon,
  SystemIcon,
} from "./icons";
import { EditorPanelContainer } from "./EditorPanelContainer";
import { CrudList } from "./CrudList";
import { AppBarAndDrawer } from "./AppBarAndDrawer";
import { EditorTitle } from "./EditorTitle";
import { EditorPanel } from "./EditorPanel";
import { EditorPanelName } from "./EditorPanelName";
import { EditorFlatPanel } from "./EditorFlatPanel";
import { CrudListSubheader } from "./CrudListSubheader";

export type EditorProps = {
  defaultState?: Partial<EditorState>;
};

/**
 * Renders controls to CRUD systems, scenes, entities, components and properties.
 */
export const Editor = ({ defaultState }: EditorProps) => {
  const [state, dispatch] = useReducer(rootReducer, {
    ...createDefaultState(),
    ...defaultState,
  });

  const selected = selectEditorObjects(state);
  const [system, resetSystem] = useSystemInitializer(
    selected,
    state.nativeComponents
  );
  useSceneSync(system, selected, dispatch);
  useEnsureSelection(state, dispatch);

  const [systemEvents, SystemDialogs] = useCrudDialogs<SystemDefinition>({
    createDialogTitle: "Add system",
    getItemName: (item) => item.name,
    onCreateItem: (name) =>
      dispatch({
        type: "CREATE_SYSTEM",
        payload: createSystemDefinition({ name }, state.nativeComponents),
      }),
    onRenameItem: (system, name) =>
      dispatch({
        type: "UPDATE_SYSTEM",
        payload: { system, update: { name } },
      }),
    onDeleteItem: (system) =>
      dispatch({ type: "DELETE_SYSTEM", payload: system }),
  });

  const [sceneEvents, SceneDialogs] = useCrudDialogs<SceneDefinition>({
    createDialogTitle: "Add scene",
    getItemName: (item) => item.name,
    onCreateItem: (name) =>
      dispatch({
        type: "CREATE_SCENE",
        payload: createSceneDefinition({ name }),
      }),
    onRenameItem: (scene, name) =>
      dispatch({ type: "UPDATE_SCENE", payload: { scene, update: { name } } }),
    onDeleteItem: (scene) => dispatch({ type: "DELETE_SCENE", payload: scene }),
  });

  const [
    entityDefinitionEvents,
    EntityDefinitionDialogs,
  ] = useCrudDialogs<EntityDefinition>({
    createDialogTitle: "Add entity",
    getItemName: (item) => item.name,
    onCreateItem: (name) =>
      dispatch({
        type: "CREATE_ENTITY_DEFINITION",
        payload: createEntityDefinition({ id: uuid(), name }),
      }),
    onRenameItem: (entityDefinition, name) =>
      dispatch({
        type: "UPDATE_ENTITY_DEFINITION",
        payload: { entityDefinition, update: { name } },
      }),
    onDeleteItem: (entityDefinition) =>
      dispatch({ type: "DELETE_ENTITY_DEFINITION", payload: entityDefinition }),
  });

  const [
    entityInitializerEvents,
    EntityInitializerDialogs,
  ] = useCrudDialogs<EntityInitializer>({
    createDialogTitle: "Add entity instance",
    getItemName: (item) => item.id,
    onCreateItem: (id) =>
      dispatch({
        type: "CREATE_ENTITY_INITIALIZER",
        payload: createEntityInitializer({
          id: id as EntityInitializerId,
          definitionId: uuid(),
        }),
      }),
    onRenameItem: (entityInitializer, id) =>
      dispatch({
        type: "UPDATE_ENTITY_INITIALIZER",
        payload: {
          entityInitializer,
          update: { id: id as EntityInitializerId },
        },
      }),
    onDeleteItem: (entityInitializer) =>
      dispatch({
        type: "DELETE_ENTITY_INITIALIZER",
        payload: entityInitializer,
      }),
  });

  const appBar = (
    <>
      <EditorTitle>{selected.system?.name}</EditorTitle>
      <Tooltip title="Reset system" onClick={resetSystem}>
        <IconButton aria-label="reset system">
          <ResetIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={`Edit ${selected.system?.name}`}>
        <IconButton
          aria-label="edit"
          onClick={() => systemEvents.onUpdateItem(selected.system!)}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={`Delete ${selected.system?.name}`}
        onClick={() => systemEvents.onDeleteItem(selected.system!)}
      >
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const drawer = (
    <CrudList
      title="Systems"
      noun="System"
      active={selected.system}
      items={state.systems}
      onSelectItem={(system) =>
        dispatch({ type: "SELECT_SYSTEM", payload: system })
      }
      onCreateItem={systemEvents.onCreateItem}
      getItemProps={({ name }) => ({ name, icon: SystemIcon })}
    />
  );

  const dialogs = (
    <>
      <SystemDialogs />
      <SceneDialogs />
      <EntityDefinitionDialogs />
      <EntityInitializerDialogs />
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

  // System and Scene available and selected
  return (
    <AppBarAndDrawer appBar={appBar} drawer={drawer}>
      {dialogs}
      <EditorPanelContainer>
        <EditorFlatPanel title="Scene">
          {selected.scene ? (
            system && <TextSystem system={system} />
          ) : (
            <Typography>
              {selected.system.scenes.length > 0
                ? "Please select a scene"
                : "Please create a scene"}
            </Typography>
          )}
        </EditorFlatPanel>
        <EditorPanel title="Scenes" name={EditorPanelName.Scenes}>
          <CrudList
            title={EditorPanelName.Scenes}
            noun="scene"
            active={selected.scene}
            items={selected.system?.scenes ?? []}
            getItemProps={({ name }) => ({ name, icon: SceneIcon })}
            onSelectItem={(scene) =>
              dispatch({ type: "SELECT_SCENE", payload: scene })
            }
            {...sceneEvents}
          />
        </EditorPanel>
        <EditorPanel title="Instances" name={EditorPanelName.Instances}>
          <CrudList
            title={EditorPanelName.Instances}
            noun="instance"
            active={selected.entityInitializer}
            items={selected.scene?.entities ?? []}
            getItemProps={({ id }) => ({
              name: id,
              icon: EntityInitializerIcon,
            })}
            onSelectItem={(entityInitializer) =>
              dispatch({
                type: "SELECT_ENTITY_INITIALIZER",
                payload: entityInitializer,
              })
            }
            {...entityInitializerEvents}
          />
        </EditorPanel>
        <EditorPanel title="Library" name={EditorPanelName.Library}>
          <CrudList
            title={EditorPanelName.Library}
            noun="entity"
            active={selected.entityDefinition}
            items={selected.system?.library.entities ?? []}
            getItemProps={({ name }) => ({ name, icon: EntityDefinitionIcon })}
            onSelectItem={(entityDefinition) =>
              dispatch({
                type: "SELECT_ENTITY_DEFINITION",
                payload: entityDefinition,
              })
            }
            {...entityDefinitionEvents}
          />
          <CrudList
            title="Components"
            active={selected.componentDefinition}
            items={selected.system?.library.components ?? []}
            getItemProps={({ name }) => ({ name, icon: ComponentIcon })}
            onSelectItem={(componentDefinition) =>
              dispatch({
                type: "SELECT_COMPONENT_DEFINITION",
                payload: componentDefinition,
              })
            }
          />
        </EditorPanel>
        <EditorPanel title="Inspector" name={EditorPanelName.Inspector}>
          <List subheader={<CrudListSubheader title="Inspector" />} />
        </EditorPanel>
      </EditorPanelContainer>
    </AppBarAndDrawer>
  );
};

const createDefaultState = (): EditorState => ({
  nativeComponents: {},
  systems: [],
  selection: {},
});
