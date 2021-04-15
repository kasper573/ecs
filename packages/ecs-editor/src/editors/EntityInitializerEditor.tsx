import React, { useCallback } from "react";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { EntityInitializer } from "../../../ecs-serializable/src/definition/EntityInitializer";
import {
  EntityDefinitionIcon,
  EntityInitializerIcon,
} from "../components/icons";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { SelectComponentDefinitionButton } from "../buttons/SelectComponentDefinitionButton";
import { ComponentDefinition } from "../../../ecs-serializable/src/definition/ComponentDefinition";
import { uuid } from "../../../ecs-common/src/uuid";
import { ComponentInitializer } from "../../../ecs-serializable/src/definition/ComponentInitializer";
import { inheritComponentInitializer } from "../../../ecs-serializable/src/functions/inheritComponentInitializer";
import { useDispatch, useSelector, useStore } from "../store";
import { selectEntityDefinition } from "../selectors/selectEntityDefinition";
import { core } from "../core";
import { DropBox } from "../components/DropBox";
import { componentDefinitionDropSpec } from "../dnd/componentDefinitionDropSpec";
import { useDialog } from "../hooks/useDialog";
import { DeleteDialog } from "../dialogs/DeleteDialog";
import { selectComponentDefinition } from "../selectors/selectComponentDefinition";
import { ComponentPropertyValueDefinition } from "../../../ecs-serializable/src/definition/ComponentPropertiesDefinition";
import { InspectorPanelHeader } from "../components/InspectorPanelHeader";
import { getEntityDisplayName } from "../functions/getEntityDisplayName";
import { ComponentInitializerList } from "./ComponentInitializerList";

export type EntityInitializerEditorProps = {
  value: EntityInitializer;
};

export const EntityInitializerEditor = ({
  value: entityInitializer,
}: EntityInitializerEditorProps) => {
  const store = useStore();
  const dispatch = useDispatch();
  const entityDefinition = useSelector((state) =>
    selectEntityDefinition(state, entityInitializer.definitionId)
  );

  const addComponent = useCallback(
    (definition: ComponentDefinition) =>
      dispatch(
        core.actions.addComponentInitializer({
          target: "initializer",
          id: entityInitializer.id,
          component: {
            definitionId: definition.id,
            id: uuid(),
            properties: {},
          },
        })
      ),
    [entityInitializer.id, dispatch]
  );

  const updateProperty = useCallback(
    (
      component: ComponentInitializer,
      propertyName: string,
      propertyValue: ComponentPropertyValueDefinition
    ) =>
      dispatch(
        core.actions.setComponentInitializerProperty({
          target: "initializer",
          id: entityInitializer.id,
          componentId: component.id,
          propertyName,
          propertyValue,
        })
      ),
    [entityInitializer.id, dispatch]
  );

  const resetProperty = useCallback(
    (component: ComponentInitializer, propertyName: string) =>
      dispatch(
        core.actions.resetComponentInitializerProperty({
          target: "initializer",
          id: entityInitializer.id,
          componentId: component.id,
          propertyName,
        })
      ),
    [entityInitializer.id, dispatch]
  );

  const removeComponent = useCallback(
    (component: ComponentInitializer) =>
      dispatch(
        core.actions.deleteComponentInitializer({
          target: "initializer",
          id: entityInitializer.id,
          componentId: component.id,
        })
      ),
    [entityInitializer.id, dispatch]
  );

  const restoreComponent = useCallback(
    (baseComponent: ComponentInitializer) =>
      dispatch(
        core.actions.addComponentInitializer({
          target: "initializer",
          id: entityInitializer.id,
          component: inheritComponentInitializer(baseComponent),
        })
      ),
    [entityInitializer.id, dispatch]
  );

  const duplicateComponent = useCallback(
    (selectedComponent: ComponentInitializer) =>
      dispatch(
        core.actions.duplicateComponentInitializer({
          target: "initializer",
          id: entityInitializer.id,
          componentId: selectedComponent.id,
        })
      ),
    [entityInitializer.id, dispatch]
  );

  const askToDeleteComponent = useDialog(
    (props, initializer: ComponentInitializer) => {
      const definition = selectComponentDefinition(
        store.getState().editor.present,
        initializer?.definitionId
      );
      return (
        <DeleteDialog
          {...props}
          onDelete={() => removeComponent(initializer)}
          name={definition?.name ?? ""}
        />
      );
    }
  );

  const setDefinitionSelected = useCallback(() => {
    if (entityDefinition) {
      dispatch(core.actions.setSelectedLibraryNode(entityDefinition.nodeId));
    }
  }, [entityDefinition, dispatch]);

  return (
    <>
      <InspectorPanelHeader>
        <SelectComponentDefinitionButton onSelected={addComponent} />
      </InspectorPanelHeader>
      <InspectedObjectInfo
        icon={<EntityInitializerIcon />}
        name={getEntityDisplayName(
          entityInitializer.name,
          entityDefinition?.name
        )}
      >
        {entityDefinition && (
          <Tooltip title="Go to definition">
            <IconButton onClick={setDefinitionSelected}>
              <EntityDefinitionIcon />
            </IconButton>
          </Tooltip>
        )}
      </InspectedObjectInfo>
      <ComponentInitializerList
        baseItems={entityDefinition?.components}
        primaryItems={entityInitializer.components}
        onUpdate={updateProperty}
        onReset={resetProperty}
        onDuplicate={duplicateComponent}
        onRemove={askToDeleteComponent}
        onRestore={restoreComponent}
      />
      <DropBox spec={componentDefinitionDropSpec(addComponent)}>
        <Typography>Drop to add component</Typography>
      </DropBox>
    </>
  );
};
