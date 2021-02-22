import React, { useReducer } from "react";
import { useCrudDialogs } from "./useCrudDialogs";
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
import { Row } from "./Row";
import { CrudList } from "./CrudList";
import { SerializableSystem } from "./types/SerializableSystem";
import { SerializableScene } from "./types/SerializableScene";
import { SerializableEntity } from "./types/SerializableEntity";
import { SerializableComponent } from "./types/SerializableComponent";
import { SerializableProperty } from "./types/SerializableProperty";

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

  const [systemEvents, SystemDialogs] = useCrudDialogs<SerializableSystem>({
    createDialogTitle: "Add system",
    getItemName,
    onCreateItem: (name) => dispatch({ type: "CREATE_SYSTEM", name }),
    onRenameItem: (system, name) =>
      dispatch({ type: "RENAME_SYSTEM", system, name }),
    onDeleteItem: (system) => dispatch({ type: "DELETE_SYSTEM", system }),
  });

  const [sceneEvents, SceneDialogs] = useCrudDialogs<SerializableScene>({
    createDialogTitle: "Add scene",
    getItemName,
    onCreateItem: (name) => dispatch({ type: "CREATE_SCENE", name }),
    onRenameItem: (scene, name) =>
      dispatch({ type: "RENAME_SCENE", scene, name }),
    onDeleteItem: (scene) => dispatch({ type: "DELETE_SCENE", scene }),
  });

  const [entityEvents, EntityDialogs] = useCrudDialogs<SerializableEntity>({
    createDialogTitle: "Add entity",
    getItemName,
    onCreateItem: (name) => dispatch({ type: "CREATE_ENTITY", name }),
    onRenameItem: (entity, name) =>
      dispatch({ type: "RENAME_ENTITY", entity, name }),
    onDeleteItem: (entity) => dispatch({ type: "DELETE_ENTITY", entity }),
  });

  const [
    componentEvents,
    ComponentDialogs,
  ] = useCrudDialogs<SerializableComponent>({
    createDialogTitle: "Add component",
    getItemName,
    onCreateItem: (name) => dispatch({ type: "CREATE_COMPONENT", name }),
    onRenameItem: (component, name) =>
      dispatch({ type: "RENAME_COMPONENT", component, name }),
    onDeleteItem: (component) =>
      dispatch({ type: "DELETE_COMPONENT", component }),
  });

  const [
    propertyEvents,
    PropertyDialogs,
  ] = useCrudDialogs<SerializableProperty>({
    createDialogTitle: "Add property",
    getItemName,
    onCreateItem: (name) => dispatch({ type: "CREATE_PROPERTY", name }),
    onRenameItem: (property, name) =>
      dispatch({ type: "RENAME_PROPERTY", property, name }),
    onDeleteItem: (property) => dispatch({ type: "DELETE_PROPERTY", property }),
  });

  return (
    <Row>
      <CrudList
        name="system"
        icon={SystemIcon}
        active={selected.system}
        items={state.systems}
        getItemProps={getCommonItemProps}
        onSelectItem={(system) => dispatch({ type: "SELECT_SYSTEM", system })}
        {...systemEvents}
      />
      <SystemDialogs />

      <CrudList
        name="scene"
        icon={SceneIcon}
        active={selected.scene}
        items={selected.system?.scenes ?? []}
        getItemProps={getCommonItemProps}
        onSelectItem={(scene) => dispatch({ type: "SELECT_SCENE", scene })}
        {...sceneEvents}
      />
      <SceneDialogs />

      <CrudList
        name="entity"
        icon={EntityIcon}
        active={selected.entity}
        items={selected.scene?.entities ?? []}
        getItemProps={getCommonItemProps}
        onSelectItem={(entity) => dispatch({ type: "SELECT_ENTITY", entity })}
        {...entityEvents}
      />
      <EntityDialogs />

      <CrudList
        name="component"
        icon={ComponentIcon}
        active={selected.component}
        items={selected.entity?.components ?? []}
        getItemProps={getCommonItemProps}
        onSelectItem={(component) =>
          dispatch({ type: "SELECT_COMPONENT", component })
        }
        {...componentEvents}
      />
      <ComponentDialogs />

      <CrudList
        name="property"
        icon={PropertyIcon}
        active={selected.property}
        items={selected.component?.properties ?? []}
        selectable={false}
        getItemProps={getCommonItemProps}
        onSelectItem={(property) =>
          dispatch({ type: "SELECT_PROPERTY", property })
        }
        {...propertyEvents}
      />
      <PropertyDialogs />
    </Row>
  );
};

const getItemName = ({ name }: { name: string }) => name;

const getCommonItemProps = ({ name }: { name: string }) => ({ name });

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
