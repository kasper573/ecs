import React, { useCallback } from "react";
import { Typography } from "@material-ui/core";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { SelectComponentDefinitionButton } from "../buttons/SelectComponentDefinitionButton";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { uuid } from "../../ecs-common/uuid";
import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../types/PanelName";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { EntityDefinitionIcon } from "../icons";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { useDispatch, useStore } from "../store";
import { core } from "../core";
import { DropBox } from "../components/DropBox";
import { componentDefinitionDropSpec } from "../dnd/componentDefinitionDropSpec";
import { useDialog } from "../hooks/useDialog";
import { selectComponentDefinition } from "../selectors/selectComponentDefinition";
import { DeleteDialog } from "../dialogs/DeleteDialog";
import { ComponentPropertyValueDefinition } from "../../ecs-serializable/types/ComponentPropertiesDefinition";
import { ComponentInitializerList } from "./ComponentInitializerList";

export type EntityDefinitionEditorProps = {
  value: EntityDefinition;
};

export const EntityDefinitionEditor = ({
  value: entityDefinition,
}: EntityDefinitionEditorProps) => {
  const store = useStore();
  const dispatch = useDispatch();

  const addComponent = useCallback(
    (component: ComponentDefinition) =>
      dispatch(
        core.actions.addComponentInitializer({
          target: "definition",
          id: entityDefinition.id,
          component: {
            definitionId: component.id,
            id: uuid(),
            properties: {},
          },
        })
      ),
    [entityDefinition.id, dispatch]
  );

  const updateProperty = useCallback(
    (
      component: ComponentInitializer,
      propertyName: string,
      propertyValue: ComponentPropertyValueDefinition
    ) =>
      dispatch(
        core.actions.setComponentInitializerProperty({
          target: "definition",
          id: entityDefinition.id,
          componentId: component.id,
          propertyName,
          propertyValue,
        })
      ),
    [entityDefinition.id, dispatch]
  );

  const resetProperty = useCallback(
    (component: ComponentInitializer, propertyName: string) =>
      dispatch(
        core.actions.resetComponentInitializerProperty({
          target: "definition",
          id: entityDefinition.id,
          componentId: component.id,
          propertyName,
        })
      ),
    [entityDefinition.id, dispatch]
  );

  const removeComponent = useCallback(
    (component: ComponentInitializer) =>
      dispatch(
        core.actions.deleteComponentInitializer({
          target: "definition",
          id: entityDefinition.id,
          componentId: component.id,
        })
      ),
    [entityDefinition.id, dispatch]
  );

  const duplicateComponent = useCallback(
    (selectedComponent: ComponentInitializer) =>
      dispatch(
        core.actions.duplicateComponentInitializer({
          target: "definition",
          id: entityDefinition.id,
          componentId: selectedComponent.id,
        })
      ),
    [entityDefinition.id, dispatch]
  );

  const askToDeleteComponent = useDialog(
    (props, initializer: ComponentInitializer) => {
      const definition = selectComponentDefinition(
        store.getState().present,
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

  return (
    <>
      <PanelHeader title={PanelName.Inspector}>
        <SelectComponentDefinitionButton onSelected={addComponent} />
      </PanelHeader>
      <InspectedObjectInfo
        icon={<EntityDefinitionIcon />}
        name={entityDefinition.name}
      />
      <ComponentInitializerList
        primaryItems={entityDefinition.components}
        onRemove={askToDeleteComponent}
        onUpdate={updateProperty}
        onReset={resetProperty}
        onDuplicate={duplicateComponent}
      />
      <DropBox spec={componentDefinitionDropSpec(addComponent)}>
        <Typography>Drop to add component</Typography>
      </DropBox>
    </>
  );
};
