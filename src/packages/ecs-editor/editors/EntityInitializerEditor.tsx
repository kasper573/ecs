import React, { useContext } from "react";
import { without } from "lodash";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../components/PanelName";
import { EntityInitializerIcon } from "../components/icons";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { SelectComponentDefinitionButton } from "../components/SelectComponentDefinitionButton";
import { EditorStateContext } from "../EditorStateContext";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { createComponentInitializer } from "../../ecs-serializable/factories/createComponentInitializer";
import { uuid } from "../functions/uuid";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/factories/createComponentPropertiesDefinition";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { useDeleteComponentDialog } from "../hooks/useDeleteComponentDialog";
import { inheritComponentInitializer } from "../../ecs-serializable/factories/inheritComponentInitializer";
import { ComponentInitializerList } from "./ComponentInitializerList";

export type EntityInitializerEditorProps = {
  value: EntityInitializer;
  onChange: (updated: EntityInitializer) => void;
};

export const EntityInitializerEditor = ({
  value: entityInitializer,
  onChange,
}: EntityInitializerEditorProps) => {
  const { libraryDefinitions } = useContext(EditorStateContext);
  const entityDefinition = libraryDefinitions.entities.find(
    (def) => def.id === entityInitializer.definitionId
  )!;
  const [deleteDialog, askToDeleteComponent] = useDeleteComponentDialog(
    removeComponent,
    libraryDefinitions.components
  );

  function createComponent(definition: ComponentDefinition) {
    addComponent(
      createComponentInitializer({
        id: uuid(),
        definitionId: definition.id,
        properties: createComponentPropertiesDefinition({}),
      })
    );
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
        <SelectComponentDefinitionButton
          componentDefinitions={libraryDefinitions.components}
          onSelected={createComponent}
        />
      </PanelHeader>
      <InspectedObjectInfo
        icon={<EntityInitializerIcon />}
        name={entityInitializer.name}
      />
      <ComponentInitializerList
        baseItems={entityDefinition.components}
        primaryItems={entityInitializer.components}
        definitions={libraryDefinitions.components}
        onChange={updateComponents}
        onRemove={askToDeleteComponent}
        onRestore={restoreComponent}
      />
      {deleteDialog}
    </>
  );
};
