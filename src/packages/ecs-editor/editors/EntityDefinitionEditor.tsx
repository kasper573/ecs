import React from "react";
import { without } from "lodash";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { SelectComponentDefinitionButton } from "../components/SelectComponentDefinitionButton";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { uuid } from "../functions/uuid";
import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../components/PanelName";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { EntityDefinitionIcon } from "../components/icons";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/factories/createComponentPropertiesDefinition";
import { useDeleteComponentDialog } from "../hooks/useDeleteComponentDialog";
import { ComponentInitializerList } from "./ComponentInitializerList";

export type EntityDefinitionEditorProps = {
  value: EntityDefinition;
  onChange: (updated: EntityDefinition) => void;
};

export const EntityDefinitionEditor = ({
  value,
  onChange,
}: EntityDefinitionEditorProps) => {
  const [deleteDialog, askToDeleteComponent] = useDeleteComponentDialog(
    removeComponent
  );

  function addComponent(definition: ComponentDefinition) {
    updateComponents([
      ...value.components,
      {
        id: uuid(),
        definitionId: definition.id,
        properties: createComponentPropertiesDefinition({}),
      },
    ]);
  }

  function updateComponents(components: ComponentInitializer[]) {
    onChange({
      ...value,
      components,
    });
  }

  function removeComponent(component: ComponentInitializer) {
    updateComponents(without(value.components, component));
  }

  return (
    <>
      <PanelHeader title={PanelName.Inspector}>
        <SelectComponentDefinitionButton onSelected={addComponent} />
      </PanelHeader>
      <InspectedObjectInfo icon={<EntityDefinitionIcon />} name={value.name} />
      <ComponentInitializerList
        primaryItems={value.components}
        onChange={updateComponents}
        onRemove={askToDeleteComponent}
      />
      {deleteDialog}
    </>
  );
};
