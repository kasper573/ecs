import React, { useReducer } from "react";
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
import { useCrudDialogsFor } from "./useCrudDialogsFor";

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
        {...cmpEvents}
      />
      <CmpDialogs />

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
        {...propEvents}
      />
      <PropDialogs />
    </Row>
  );
};

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
