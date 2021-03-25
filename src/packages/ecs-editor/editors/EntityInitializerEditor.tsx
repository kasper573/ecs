import React from "react";
import { without } from "lodash";
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
import { useSelector } from "../store";
import { selectEntityDefinition } from "../selectors/selectEntityDefinition";
import { ComponentInitializerList } from "./ComponentInitializerList";

export type EntityInitializerEditorProps = {
  value: EntityInitializer;
  onChange: (updated: EntityInitializer) => void;
};

export const EntityInitializerEditor = ({
  value: entityInitializer,
  onChange,
}: EntityInitializerEditorProps) => {
  const entityDefinition = useSelector(
    selectEntityDefinition(entityInitializer.definitionId)
  );
  if (!entityDefinition) {
    throw new Error(
      "Can't edit entity initializer without entity definition available"
    );
  }
  const [deleteDialog, askToDeleteComponent] = useDeleteComponentDialog(
    removeComponent
  );

  function createComponent(definition: ComponentDefinition) {
    addComponent({
      id: uuid(),
      definitionId: definition.id,
      properties: createComponentPropertiesDefinition({}),
    });
  }

  function addComponent(initializer: ComponentInitializer) {
    updateComponents([...entityInitializer.components, initializer]);
  }

  function updateComponents(components: ComponentInitializer[]) {
    onChange({
      ...entityInitializer,
      components,
    });
  }

  function removeComponent(component: ComponentInitializer) {
    updateComponents(without(entityInitializer.components, component));
  }

  function restoreComponent(baseComponent: ComponentInitializer) {
    addComponent(inheritComponentInitializer(baseComponent));
  }

  return (
    <>
      <PanelHeader title={PanelName.Inspector}>
        <SelectComponentDefinitionButton onSelected={createComponent} />
      </PanelHeader>
      <InspectedObjectInfo
        icon={<EntityInitializerIcon />}
        name={entityInitializer.name}
      />
      <ComponentInitializerList
        baseItems={entityDefinition.components}
        primaryItems={entityInitializer.components}
        onChange={updateComponents}
        onRemove={askToDeleteComponent}
        onRestore={restoreComponent}
      />
      {deleteDialog}
    </>
  );
};
