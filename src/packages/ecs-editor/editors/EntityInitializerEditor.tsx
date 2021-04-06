import React, { useCallback } from "react";
import { Typography } from "@material-ui/core";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../types/PanelName";
import { EntityInitializerIcon } from "../icons";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { SelectComponentDefinitionButton } from "../buttons/SelectComponentDefinitionButton";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { uuid } from "../../ecs-common/uuid";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { inheritComponentInitializer } from "../../ecs-serializable/functions/inheritComponentInitializer";
import { useDispatch, useSelector, useStore } from "../store";
import { selectEntityDefinition } from "../selectors/selectEntityDefinition";
import { core } from "../core";
import { DropBox } from "../components/DropBox";
import { componentDefinitionDropSpec } from "../dnd/componentDefinitionDropSpec";
import { useDialog } from "../hooks/useDialog";
import { DeleteDialog } from "../dialogs/DeleteDialog";
import { selectComponentDefinition } from "../selectors/selectComponentDefinition";
import { ComponentPropertyValueDefinition } from "../../ecs-serializable/types/ComponentPropertiesDefinition";
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
        icon={<EntityInitializerIcon />}
        name={entityInitializer.name}
      />
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
