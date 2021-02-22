import React, { useReducer } from "react";
import { CrudListWithDialogs } from "./CrudListWithDialogs";
import {
  ComponentIcon,
  EntityIcon,
  PropertyIcon,
  SceneIcon,
  SystemIcon,
} from "./icons";
import { updateState } from "./state/mutations/updateState";
import { EditorState } from "./state/EditorState";
import { selectEditorObjects } from "./state/selectEditorObjects";
import { Row } from "./Row";

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

  return (
    <Row>
      <CrudListWithDialogs
        name="system"
        icon={SystemIcon}
        active={selected.system}
        items={state.systems}
        getItemName={getItemName}
        getItemProps={getCommonItemProps}
        onCreateItem={(name) => dispatch({ type: "CREATE_SYSTEM", name })}
        onRenameItem={(system, name) =>
          dispatch({ type: "RENAME_SYSTEM", system, name })
        }
        onDeleteItem={(system) => dispatch({ type: "DELETE_SYSTEM", system })}
        onSelectItem={(system) =>
          dispatch({
            type: "SELECT_SYSTEM",
            system,
          })
        }
      />

      <CrudListWithDialogs
        name="scene"
        icon={SceneIcon}
        active={selected.scene}
        items={selected.system?.scenes ?? []}
        getItemName={getItemName}
        getItemProps={getCommonItemProps}
        onCreateItem={(name) => dispatch({ type: "CREATE_SCENE", name })}
        onRenameItem={(scene, name) =>
          dispatch({ type: "RENAME_SCENE", scene, name })
        }
        onDeleteItem={(scene) => dispatch({ type: "DELETE_SCENE", scene })}
        onSelectItem={(scene) =>
          dispatch({
            type: "SELECT_SCENE",
            scene,
          })
        }
      />

      <CrudListWithDialogs
        name="entity"
        icon={EntityIcon}
        active={selected.entity}
        items={selected.scene?.entities ?? []}
        getItemName={getItemName}
        getItemProps={getCommonItemProps}
        onCreateItem={(name) => dispatch({ type: "CREATE_ENTITY", name })}
        onRenameItem={(entity, name) =>
          dispatch({ type: "RENAME_ENTITY", entity, name })
        }
        onDeleteItem={(entity) => dispatch({ type: "DELETE_ENTITY", entity })}
        onSelectItem={(entity) =>
          dispatch({
            type: "SELECT_ENTITY",
            entity,
          })
        }
      />

      <CrudListWithDialogs
        name="component"
        icon={ComponentIcon}
        active={selected.component}
        items={selected.entity?.components ?? []}
        getItemName={getItemName}
        getItemProps={getCommonItemProps}
        onCreateItem={(name) => dispatch({ type: "CREATE_COMPONENT", name })}
        onRenameItem={(component, name) =>
          dispatch({ type: "RENAME_COMPONENT", component, name })
        }
        onDeleteItem={(component) =>
          dispatch({ type: "DELETE_COMPONENT", component })
        }
        onSelectItem={(component) =>
          dispatch({
            type: "SELECT_COMPONENT",
            component,
          })
        }
      />

      <CrudListWithDialogs
        name="property"
        icon={PropertyIcon}
        active={selected.property}
        items={selected.component?.properties ?? []}
        selectable={false}
        getItemName={getItemName}
        getItemProps={getCommonItemProps}
        onCreateItem={(name) => dispatch({ type: "CREATE_PROPERTY", name })}
        onRenameItem={(property, name) =>
          dispatch({ type: "RENAME_PROPERTY", property, name })
        }
        onDeleteItem={(property) =>
          dispatch({ type: "DELETE_PROPERTY", property })
        }
        onSelectItem={(property) =>
          dispatch({
            type: "SELECT_PROPERTY",
            property,
          })
        }
      />
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
