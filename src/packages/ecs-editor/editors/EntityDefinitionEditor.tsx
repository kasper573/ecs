import React, { useCallback } from "react";
import { Typography } from "@material-ui/core";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { SelectComponentDefinitionButton } from "../components/SelectComponentDefinitionButton";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { uuid } from "../../ecs-common/uuid";
import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../types/PanelName";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { EntityDefinitionIcon } from "../icons";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/functions/createComponentPropertiesDefinition";
import { useDispatch, useStore } from "../store";
import { core } from "../core";
import { DropBox } from "../components/DropBox";
import { componentDefinitionDropSpec } from "../dnd/componentDefinitionDropSpec";
import { useDialog } from "../hooks/useDialog";
import { selectComponentDefinition } from "../selectors/selectComponentDefinition";
import { DeleteDialog } from "../components/DeleteDialog";
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
        onUpdate={updateProperties}
        onDuplicate={duplicateComponent}
      />
      <DropBox spec={componentDefinitionDropSpec(addComponent)}>
        <Typography>Drop to add component</Typography>
      </DropBox>
    </>
  );
};
