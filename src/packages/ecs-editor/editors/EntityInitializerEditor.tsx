import React, { useCallback } from "react";
import { DropTargetMonitor } from "react-dnd";
import { Typography } from "@material-ui/core";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../types/PanelName";
import { EntityInitializerIcon } from "../components/icons";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { SelectComponentDefinitionButton } from "../components/SelectComponentDefinitionButton";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { uuid } from "../../ecs-common/uuid";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/functions/createComponentPropertiesDefinition";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { useDeleteComponentDialog } from "../hooks/useDeleteComponentDialog";
import { inheritComponentInitializer } from "../../ecs-serializable/functions/inheritComponentInitializer";
import { useDispatch, useSelector } from "../store";
import { selectEntityDefinition } from "../selectors/selectEntityDefinition";
import { core } from "../core";
import { DropBox } from "../components/DropBox";
import { DragType } from "../types/DragType";
import { ComponentInitializerList } from "./ComponentInitializerList";

export type EntityInitializerEditorProps = {
  value: EntityInitializer;
};

export const EntityInitializerEditor = ({
  value: entityInitializer,
}: EntityInitializerEditorProps) => {
  const dispatch = useDispatch();
  const entityDefinition = useSelector((state) =>
    selectEntityDefinition(state, entityInitializer.definitionId)
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
        onDuplicate={duplicateComponent}
        onRemove={askToDeleteComponent}
        onRestore={restoreComponent}
      />
      <DropBox spec={dropSpec(addComponent)}>
        <Typography>Drop to add component</Typography>
      </DropBox>
      {deleteDialog}
    </>
  );
};

const dropSpec = (handleDrop: (def: ComponentDefinition) => void) => ({
  accept: DragType.ComponentDefinition,
  drop: handleDrop,
  collect: (monitor: DropTargetMonitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
});
