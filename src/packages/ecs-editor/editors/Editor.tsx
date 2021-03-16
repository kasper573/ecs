import React from "react";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { TextSystem } from "../../ecs-react/TextSystem";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { createSystemDefinition } from "../../ecs-serializable/factories/createSystemDefinition";
import { createSceneDefinition } from "../../ecs-serializable/factories/createSceneDefinition";
import { createEntityDefinition } from "../../ecs-serializable/factories/createEntityDefinition";
import { EditorState } from "../types/EditorState";
import { selectSelectedObjects } from "../selectors/selectSelectedObjects";
import { useSystemInitializer } from "../hooks/useSystemInitializer";
import { useSceneSync } from "../hooks/useSceneSync";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { uuid } from "../functions/uuid";
import {
  LibraryEntityNode,
  LibraryNode,
} from "../../ecs-serializable/types/LibraryNode";
import { selectLibraryNodeLabel } from "../selectors/selectLibraryNodeLabel";
import { getDefinitionsInLibrary } from "../../ecs-serializable/functions/getDefinitionsInLibrary";
import { useDialog } from "../hooks/useDialog";
import { serializeJS } from "../../ecs-serializable/jsSerializer";
import { omit } from "../functions/omit";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";
import { useEditorState } from "../hooks/useEditorState";
import {
  DeleteIcon,
  EditIcon,
  EntityInitializerIcon,
  ResetIcon,
  SaveIcon,
  SceneIcon,
  SystemIcon,
} from "../components/icons";
import { PanelContainer } from "../components/PanelContainer";
import { CrudList } from "../components/CrudList";
import { AppBarAndDrawer } from "../components/AppBarAndDrawer";
import { EditorTitle } from "../components/EditorTitle";
import { Panel } from "../components/Panel";
import { PanelName } from "../components/PanelName";
import { FlatPanel } from "../components/FlatPanel";
import {
  PanelHeader,
  EditorPanelHeaderLayout,
} from "../components/PanelHeader";
import { LibraryTree } from "../components/LibraryTree";
import { CreateEntityInitializerButton } from "../components/CreateEntityInitializerButton";
import { SimpleDialog } from "../components/SimpleDialog";
import { InspectedObjectEditor } from "./InspectedObjectEditor";

export type EditorProps = {
  defaultState: EditorState;
  nativeComponents: NativeComponents;
};

/**
 * Renders controls to CRUD systems, scenes, entities, components and properties.
 */
export const Editor = ({ defaultState, nativeComponents }: EditorProps) => {
  const [state, dispatch] = useEditorState(nativeComponents, defaultState);

  const selected = selectSelectedObjects(state);
  const [system, resetSystem] = useSystemInitializer(
    selected,
    nativeComponents
  );
  useSceneSync(system, selected, dispatch);

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
        payload: createSystemDefinition({ id: uuid(), name }),
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
        payload: createSceneDefinition({ id: uuid(), name }),
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
    getItemName: selectLibraryNodeLabel,
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
      <PanelHeader title="Systems" onCreate={systemEvents.onCreateItem} />
      <CrudList
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
        <FlatPanel>
          <Typography>
            {state.systems.length > 0
              ? "Please select a system"
              : "Please create a system"}
          </Typography>
        </FlatPanel>
      </AppBarAndDrawer>
    );
  }

  // System and Scene available and selected
  return (
    <AppBarAndDrawer appBar={appBar} drawer={drawer}>
      {dialogs}
      <PanelContainer>
        <FlatPanel>
          {selected.scene ? (
            system && <TextSystem system={system} />
          ) : (
            <Typography>
              {selected.system.scenes.length > 0
                ? "Please select a scene"
                : "Please create a scene"}
            </Typography>
          )}
        </FlatPanel>
        <Panel name={PanelName.Scenes}>
          <PanelHeader
            title={PanelName.Scenes}
            onCreate={sceneEvents.onCreateItem}
          />
          <CrudList
            title={PanelName.Scenes}
            active={selected.scene}
            items={selected.system?.scenes ?? []}
            getItemProps={({ name }) => ({ name, icon: SceneIcon })}
            onSelectItem={(scene) =>
              dispatch({ type: "SELECT_SCENE", payload: scene })
            }
            {...omit(sceneEvents, "onCreateItem")}
          />
        </Panel>
        {selected.scene && (
          <>
            <Panel name={PanelName.Instances}>
              <EditorPanelHeaderLayout title={PanelName.Instances}>
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
                {...omit(entityInitializerEvents, "onCreateItem")}
              />
            </Panel>
            <Panel name={PanelName.Library}>
              <PanelHeader
                title="Library"
                noun="entity"
                onCreate={libraryEntityNodeEvents.onCreateItem}
              />
              <LibraryTree
                library={selected.system.library}
                selected={selected.libraryNode}
                onSelectedChange={(nodeId) =>
                  dispatch({
                    type: "SELECT_LIBRARY_NODE",
                    payload: nodeId,
                  })
                }
              />
            </Panel>
            <Panel name={PanelName.Inspector}>
              <PanelHeader title="Inspector" />
              <InspectedObjectEditor value={selected.inspected} />
            </Panel>
          </>
        )}
      </PanelContainer>
    </AppBarAndDrawer>
  );
};
