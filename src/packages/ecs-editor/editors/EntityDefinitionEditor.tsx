import React, { useCallback } from "react";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { SelectComponentDefinitionButton } from "../components/SelectComponentDefinitionButton";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { uuid } from "../../ecs-common/uuid";
import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../components/PanelName";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { EntityDefinitionIcon } from "../components/icons";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/factories/createComponentPropertiesDefinition";
import { useDeleteComponentDialog } from "../hooks/useDeleteComponentDialog";
import { useDispatch } from "../store";
import { core } from "../core";
import { ComponentInitializerList } from "./ComponentInitializerList";

export type EntityDefinitionEditorProps = {
  value: EntityDefinition;
};

export const EntityDefinitionEditor = ({
  value: entityDefinition,
}: EntityDefinitionEditorProps) => {
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
            properties: createComponentPropertiesDefinition({}),
          },
        })
      ),
    [entityDefinition.id, dispatch]
  );

  const updateProperties = useCallback(
    (component: ComponentInitializer) =>
      dispatch(
        core.actions.updateComponentProperties({
          target: "definition",
          id: entityDefinition.id,
          componentId: component.id,
          properties: component.properties,
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

  const [deleteDialog, askToDeleteComponent] = useDeleteComponentDialog(
    removeComponent
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
        onUpdate={updateProperties}
      />
      {deleteDialog}
    </>
  );
};
