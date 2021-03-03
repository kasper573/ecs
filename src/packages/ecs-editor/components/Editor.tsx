import React, { useReducer } from "react";
import {
  IconButton,
  ListItemSecondaryAction,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { TextSystem } from "../../ecs-react/TextSystem";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { createSystemDefinition } from "../../ecs-serializable/factories/createSystemDefinition";
import { createSceneDefinition } from "../../ecs-serializable/factories/createSceneDefinition";
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
  LibraryEntityNode,
  LibraryNode,
} from "../../ecs-serializable/types/LibraryNode";
import { getLibraryNodeLabel } from "../functions/getLibraryNodeLabel";
import { getDefinitionsInLibrary } from "../../ecs-serializable/functions/getDefinitionsInLibrary";
import { useDialog } from "../hooks/useDialog";
import { serializeJS } from "../../ecs-serializable/jsSerializer";
import {
  DeleteIcon,
  EditIcon,
  EntityInitializerIcon,
  ResetIcon,
  SaveIcon,
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
import {
  EditorPanelHeader,
  EditorPanelHeaderLayout,
} from "./EditorPanelHeader";
import { EditorLibraryTree } from "./EditorLibraryTree";
import { OpaqueListSubheader } from "./OpaqueListSubheader";
import { CreateEntityInitializerButton } from "./CreateEntityInitializerButton";
import { SimpleDialog } from "./SimpleDialog";

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

  const [showSaveDialog, saveDialog] = useDialog((props) => (
    <SimpleDialog title="Save" {...props}>
      <pre>{serializeJS(state.systems, { space: 2 })}</pre>
    </SimpleDialog>
  ));

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
    libraryEntityNodeEvents,
    LibraryEntityNodeDialogs,
  ] = useCrudDialogs<LibraryEntityNode>({
    createDialogTitle: "Add entity",
    getItemName: getLibraryNodeLabel,
    onCreateItem: (name) =>
      dispatch({
        type: "CREATE_LIBRARY_NODE",
        payload: {
          id: uuid(),
          type: "entity",
          entity: createEntityDefinition({ id: uuid(), name }),
        },
      }),
    onRenameItem: (target, name) =>
      dispatch({
        type: "UPDATE_LIBRARY_NODE",
        payload: {
          target,
          replacement: {
            id: target.id,
            type: "entity",
            entity: createEntityDefinition({ id: target.entity.id, name }),
          },
        },
      }),
    onDeleteItem: (libraryNode) =>
      dispatch({
        type: "DELETE_LIBRARY_NODE",
        payload: libraryNode as LibraryNode,
      }),
  });

  const [
    entityInitializerEvents,
    EntityInitializerDialogs,
  ] = useCrudDialogs<EntityInitializer>({
    createDialogTitle: "Initialize entity",
    getItemName: (item) => item.name,
    onCreateItem: () => {},
    onRenameItem: (entityInitializer, name) =>
      dispatch({
        type: "UPDATE_ENTITY_INITIALIZER",
        payload: {
          entityInitializer,
          update: { name },
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
      <Tooltip title="Save" onClick={showSaveDialog}>
        <IconButton edge="end" aria-label="save">
          <SaveIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const drawer = (
    <>
      <EditorPanelHeader
        title={EditorPanelName.Scenes}
        onCreate={systemEvents.onCreateItem}
      />
      <CrudList
        title="Systems"
        active={selected.system}
        items={state.systems}
        onSelectItem={(system) =>
          dispatch({ type: "SELECT_SYSTEM", payload: system })
        }
        getItemProps={({ name }) => ({ name, icon: SystemIcon })}
      />
    </>
  );

  const dialogs = (
    <>
      <SystemDialogs />
      <SceneDialogs />
      <LibraryEntityNodeDialogs />
      <EntityInitializerDialogs />
      {saveDialog}
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
        <EditorFlatPanel>
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
        <EditorPanel name={EditorPanelName.Scenes}>
          <EditorPanelHeader
            title={EditorPanelName.Scenes}
            onCreate={sceneEvents.onCreateItem}
          />
          <CrudList
            title={EditorPanelName.Scenes}
            active={selected.scene}
            items={selected.system?.scenes ?? []}
            getItemProps={({ name }) => ({ name, icon: SceneIcon })}
            onSelectItem={(scene) =>
              dispatch({ type: "SELECT_SCENE", payload: scene })
            }
            {...sceneEvents}
          />
        </EditorPanel>
        {selected.scene && (
          <>
            <EditorPanel name={EditorPanelName.Instances}>
              <EditorPanelHeaderLayout title={EditorPanelName.Instances}>
                <CreateEntityInitializerButton
                  entityDefinitions={
                    getDefinitionsInLibrary(selected.system?.library ?? [])
                      .entities
                  }
                  onCreate={(entityInitializer) =>
                    dispatch({
                      type: "CREATE_ENTITY_INITIALIZER",
                      payload: entityInitializer,
                    })
                  }
                />
              </EditorPanelHeaderLayout>
              <CrudList
                active={selected.entityInitializer}
                items={selected.scene?.entities ?? []}
                getItemProps={({ name }) => ({
                  name,
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
            <EditorPanel name={EditorPanelName.Library}>
              <EditorPanelHeader
                title="Library"
                noun="entity"
                onCreate={libraryEntityNodeEvents.onCreateItem}
              />
              <EditorLibraryTree
                library={selected.system.library}
                selected={selected.libraryNode}
                onSelectedChange={(nodeId) =>
                  dispatch({
                    type: "SELECT_LIBRARY_NODE",
                    payload: nodeId,
                  })
                }
              />
            </EditorPanel>
            <EditorPanel name={EditorPanelName.Inspector}>
              <EditorPanelHeader title="Inspector" />
              {selected.libraryNode &&
                getLibraryNodeLabel(selected.libraryNode)}
            </EditorPanel>
          </>
        )}
      </EditorPanelContainer>
    </AppBarAndDrawer>
  );
};

const createDefaultState = (): EditorState => ({
  nativeComponents: {},
  systems: [],
  selection: {},
});
