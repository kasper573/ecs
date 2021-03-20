import React, { useContext } from "react";
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
  const addComponent = (definition: ComponentDefinition) =>
    updateComponents([
      ...entityInitializer.components,
      createComponentInitializer({
        id: uuid(),
        definitionId: definition.id,
        properties: createComponentPropertiesDefinition({}),
      }),
    ]);
  const updateComponents = (components: ComponentInitializer[]) => {
    onChange({
      ...entityInitializer,
      components,
    });
  };
  const mergedComponents = mergeComponentInitializers(
    entityDefinition.components,
    entityInitializer.components
  );
  return (
    <>
      <PanelHeader title={PanelName.Inspector}>
        <SelectComponentDefinitionButton
          componentDefinitions={libraryDefinitions.components}
          onSelected={addComponent}
        />
      </PanelHeader>
      <InspectedObjectInfo
        icon={<EntityInitializerIcon />}
        name={entityInitializer.name}
      />
      <ComponentInitializerList
        items={mergedComponents}
        definitions={libraryDefinitions.components}
        onChange={updateComponents}
        elevation={0}
      />
    </>
  );
};

const mergeComponentInitializers = (
  a: ComponentInitializer[],
  b: ComponentInitializer[]
) => b;
