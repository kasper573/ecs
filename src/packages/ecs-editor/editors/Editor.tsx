import React from "react";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { TextSystem } from "../../ecs-react/TextSystem";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { EditorState } from "../types/EditorState";
import { selectSelectedObjects } from "../selectors/selectSelectedObjects";
import { useSystemInitializer } from "../hooks/useSystemInitializer";
import { useSceneSync } from "../hooks/useSceneSync";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { uuid } from "../functions/uuid";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { getLibraryNodeLabel } from "../functions/getLibraryNodeLabel";
import { getDefinitionsInLibrary } from "../../ecs-serializable/functions/getDefinitionsInLibrary";
import { useDialog } from "../hooks/useDialog";
import { serializeJS } from "../../ecs-serializable/jsSerializer";
import { omit } from "../functions/omit";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";
import {
  AddIcon,
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
import { PanelHeader } from "../components/PanelHeader";
import { LibraryTree } from "../components/LibraryTree";
import { CreateEntityInitializerButton } from "../components/CreateEntityInitializerButton";
import { SimpleDialog } from "../components/SimpleDialog";
import { InspectedObject } from "../types/InspectedObject";
import { EditorStateContext } from "../EditorStateContext";
import { EditorSelectionName } from "../types/EditorSelection";
import { renameLibraryNode } from "../functions/renameLibraryNode";
import { useDispatch, useSelector } from "../store";
import { values } from "../../nominal";
import { requireSelection } from "../functions/requireSelection";
import { core } from "../slices/core";
import { InspectedObjectEditor } from "./InspectedObjectEditor";

export type EditorProps = {
  nativeComponents: NativeComponents;
};

const selectDerivedState = (state: EditorState) => {
  const { ecs, selection } = state;
  const selected = selectSelectedObjects(state);
  const selectedSystemLibrary = values(ecs.library).filter(
    (node) => node.systemId === selection.system
  );
  return {
    ecs,
    selection,
    selected,
    selectedSystemScenes: values(ecs.scenes).filter(
      (scene) => scene.systemId === selection.system
    ),
    selectedSceneEntities: values(ecs.entities).filter(
      (entity) => entity.sceneId === selection.scene
    ),
    selectedSystemLibrary,
    libraryDefinitions: getDefinitionsInLibrary(selectedSystemLibrary),
  };
};

/**
 * Renders controls to CRUD systems, scenes, entities, components and properties.
 */
export const Editor = ({ nativeComponents }: EditorProps) => {
  const {
    ecs,
    selected,
    selection,
    selectedSystemScenes,
    selectedSystemLibrary,
    selectedSceneEntities,
    libraryDefinitions,
  } = useSelector(selectDerivedState);

  const [system, resetSystem] = useSystemInitializer(nativeComponents);
  useSceneSync(system);

  const dispatch = useDispatch();

  const selectionFor = <K extends EditorSelectionName>(name: K) =>
    requireSelection(selection, name);

  const saveInspectorChange = (updated: InspectedObject) => {
    switch (updated.type) {
      case "entityInitializer":
        dispatch(
          core.actions.UPDATE_ENTITY_INITIALIZER({
            entityId: updated.object.id,
            update: updated.object,
          })
        );

        break;
      case "libraryNode":
        dispatch(
          core.actions.UPDATE_LIBRARY_NODE({
            nodeId: updated.object.id,
            replacement: updated.object,
          })
        );
    }
  };

  const [showSaveDialog, saveDialog] = useDialog((props) => (
    <SimpleDialog title="Save" {...props}>
      <pre>{serializeJS(ecs, { space: 2 })}</pre>
    </SimpleDialog>
  ));

  const [systemEvents, SystemDialogs] = useCrudDialogs<SystemDefinition>({
    createDialogTitle: "Add system",
    getItemName: (item) => item.name,
    onCreateItem: (name) =>
      dispatch(core.actions.CREATE_SYSTEM({ id: uuid(), name })),
    onRenameItem: (system, name) =>
      dispatch(
        core.actions.UPDATE_SYSTEM({ systemId: system.id, update: { name } })
      ),
    onDeleteItem: (system) => dispatch(core.actions.DELETE_SYSTEM(system.id)),
  });

  const [sceneEvents, SceneDialogs] = useCrudDialogs<SceneDefinition>({
    createDialogTitle: "Add scene",
    getItemName: (item) => item.name,
    onCreateItem: (name) =>
      dispatch(
        core.actions.CREATE_SCENE({
          id: uuid(),
          name,
          systemId: selectionFor("system"),
        })
      ),
    onRenameItem: (scene, name) =>
      dispatch(
        core.actions.UPDATE_SCENE({
          sceneId: scene.id,
          update: { name },
        })
      ),
    onDeleteItem: (scene) => dispatch(core.actions.DELETE_SCENE(scene.id)),
  });

  const [libraryNodeEvents, LibraryNodeDialogs] = useCrudDialogs<LibraryNode>({
    createDialogTitle: "Add entity",
    getItemName: getLibraryNodeLabel,
    onCreateItem: (name) =>
      dispatch(
        core.actions.CREATE_LIBRARY_NODE({
          systemId: selectionFor("system"),
          id: uuid(),
          type: "entity",
          entity: { id: uuid(), name, components: [] },
        })
      ),
    onRenameItem: (target, name) =>
      dispatch(
        core.actions.UPDATE_LIBRARY_NODE({
          nodeId: target.id,
          replacement: renameLibraryNode(target, name),
        })
      ),
    onDeleteItem: (node) => dispatch(core.actions.DELETE_LIBRARY_NODE(node.id)),
  });

  const [
    entityInitializerEvents,
    EntityInitializerDialogs,
  ] = useCrudDialogs<EntityInitializer>({
    createDialogTitle: "Initialize entity",
    getItemName: (item) => item.name,
    onCreateItem: () => {},
    onRenameItem: (entity, name) =>
      dispatch(
        core.actions.UPDATE_ENTITY_INITIALIZER({
          entityId: entity.id,
          update: { name },
        })
      ),
    onDeleteItem: (entity) =>
      dispatch(core.actions.DELETE_ENTITY_INITIALIZER(entity.id)),
  });

  const appBar = (
    <>
      <EditorTitle>{selected.system?.name}</EditorTitle>
      <Tooltip title="Reset system" onClick={resetSystem}>
        <IconButton aria-label="reset system">
          <ResetIcon />
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
      <PanelHeader title="Systems">
        <Tooltip title="Add system">
          <IconButton
            edge="end"
            aria-label="add system"
            onClick={systemEvents.onCreateItem}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </PanelHeader>
      <CrudList
        active={selected.system}
        items={values(ecs.systems)}
        {...omit(systemEvents, "onCreateItem")}
        onSelectItem={(system) =>
          dispatch(core.actions.SELECT_SYSTEM(system.id))
        }
        getItemProps={({ name }) => ({ name, icon: SystemIcon })}
      />
    </>
  );

  const dialogs = (
    <>
      <SystemDialogs />
      <SceneDialogs />
      <LibraryNodeDialogs />
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
            {values(ecs.systems).length > 0
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
              {selectedSystemScenes.length > 0
                ? "Please select a scene"
                : "Please create a scene"}
            </Typography>
          )}
        </FlatPanel>
        <Panel name={PanelName.Scenes}>
          <PanelHeader title={PanelName.Scenes}>
            <Tooltip title="Add scene">
              <IconButton
                edge="end"
                aria-label="add scene"
                onClick={sceneEvents.onCreateItem}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </PanelHeader>
          <CrudList
            title={PanelName.Scenes}
            active={selected.scene}
            items={selectedSystemScenes}
            getItemProps={({ name }) => ({ name, icon: SceneIcon })}
            onSelectItem={(scene) =>
              dispatch(core.actions.SELECT_SCENE(scene.id))
            }
            {...omit(sceneEvents, "onCreateItem")}
          />
        </Panel>

        {selected.scene && (
          <>
            <Panel name={PanelName.Instances}>
              <PanelHeader title={PanelName.Instances}>
                <CreateEntityInitializerButton
                  entityDefinitions={values(libraryDefinitions.entities)}
                  onCreate={(entityInitializer) =>
                    dispatch(
                      core.actions.CREATE_ENTITY_INITIALIZER(entityInitializer)
                    )
                  }
                />
              </PanelHeader>
              <CrudList
                active={selected.entityInitializer}
                items={selectedSceneEntities}
                getItemProps={({ name }) => ({
                  name,
                  icon: EntityInitializerIcon,
                })}
                onSelectItem={(entityInitializer) =>
                  dispatch(
                    core.actions.SELECT_ENTITY_INITIALIZER(entityInitializer.id)
                  )
                }
                {...omit(entityInitializerEvents, "onCreateItem")}
              />
            </Panel>
            <Panel name={PanelName.Library}>
              <PanelHeader title="Library">
                <Tooltip title="Create entity">
                  <IconButton
                    edge="end"
                    aria-label="create entity"
                    onClick={libraryNodeEvents.onCreateItem}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </PanelHeader>
              <LibraryTree
                library={selectedSystemLibrary}
                selected={selected.libraryNode}
                onEdit={libraryNodeEvents.onUpdateItem}
                onDelete={libraryNodeEvents.onDeleteItem}
                onSelectedChange={(node) =>
                  dispatch(core.actions.SELECT_LIBRARY_NODE(node.id))
                }
              />
            </Panel>
            <Panel name={PanelName.Inspector}>
              {selected.inspected && (
                <EditorStateContext.Provider
                  value={{
                    nativeComponents,
                    libraryDefinitions: {
                      entities: values(libraryDefinitions.entities),
                      components: values(libraryDefinitions.components),
                    },
                  }}
                >
                  <InspectedObjectEditor
                    value={selected.inspected}
                    onChange={saveInspectorChange}
                  />
                </EditorStateContext.Provider>
              )}
            </Panel>
          </>
        )}
      </PanelContainer>
    </AppBarAndDrawer>
  );
};
