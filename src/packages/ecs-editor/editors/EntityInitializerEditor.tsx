import React, { useCallback } from "react";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../components/PanelName";
import { EntityInitializerIcon } from "../components/icons";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { SelectComponentDefinitionButton } from "../components/SelectComponentDefinitionButton";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { uuid } from "../functions/uuid";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/factories/createComponentPropertiesDefinition";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { useDeleteComponentDialog } from "../hooks/useDeleteComponentDialog";
import { inheritComponentInitializer } from "../../ecs-serializable/factories/inheritComponentInitializer";
import { useDispatch, useSelector } from "../store";
import { selectEntityDefinition } from "../selectors/selectEntityDefinition";
import { core } from "../slices/core";
import { ComponentInitializerList } from "./ComponentInitializerList";

export type EntityInitializerEditorProps = {
  value: EntityInitializer;
};

export const EntityInitializerEditor = ({
  value: entityInitializer,
}: EntityInitializerEditorProps) => {
  const dispatch = useDispatch();
  const entityDefinition = useSelector(
    selectEntityDefinition(entityInitializer.definitionId)
  );
  if (!entityDefinition) {
    throw new Error(
      "Can't edit entity initializer without entity definition available"
    );
  }

  const addComponent = useCallback(
    (definition: ComponentDefinition) =>
      dispatch(
        core.actions.addComponentInitializer({
          target: "initializer",
          id: entityInitializer.id,
          component: {
            definitionId: definition.id,
            id: uuid(),
            properties: createComponentPropertiesDefinition({}),
          },
        })
      ),
    [entityInitializer.id, dispatch]
  );

  const updateProperties = useCallback(
    (component: ComponentInitializer) =>
      dispatch(
        core.actions.updateComponentProperties({
          target: "initializer",
          id: entityInitializer.id,
          componentId: component.id,
          properties: component.properties,
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

  const [deleteDialog, askToDeleteComponent] = useDeleteComponentDialog(
    removeComponent
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
        baseItems={entityDefinition.components}
        primaryItems={entityInitializer.components}
        onUpdate={updateProperties}
        onRemove={askToDeleteComponent}
        onRestore={restoreComponent}
      />
      {deleteDialog}
    </>
  );
};
