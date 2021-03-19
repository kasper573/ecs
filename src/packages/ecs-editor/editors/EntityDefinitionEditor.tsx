import { useContext } from "react";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { SelectComponentDefinitionButton } from "../components/SelectComponentDefinitionButton";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { createComponentInitializer } from "../../ecs-serializable/factories/createComponentInitializer";
import { uuid } from "../functions/uuid";
import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../components/PanelName";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { EntityDefinitionIcon } from "../components/icons";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { createComponentPropertiesDefinition } from "../../ecs-serializable/factories/createComponentPropertiesDefinition";
import { ComponentsContext } from "../ComponentsContext";
import { ComponentInitializerList } from "./ComponentInitializerList";

export type EntityDefinitionEditorProps = {
  value: EntityDefinition;
  onChange: (updated: EntityDefinition) => void;
};

export const EntityDefinitionEditor = ({
  value,
  onChange,
}: EntityDefinitionEditorProps) => {
  const { componentDefinitions } = useContext(ComponentsContext);
  const addComponent = (definition: ComponentDefinition) =>
    updateComponents([
      ...value.components,
      createComponentInitializer({
        id: uuid(),
        definitionId: definition.id,
        properties: createComponentPropertiesDefinition({}),
      }),
    ]);
  const updateComponents = (components: ComponentInitializer[]) => {
    onChange({
      ...value,
      components,
    });
  };
  return (
    <>
      <PanelHeader title={PanelName.Inspector}>
        <SelectComponentDefinitionButton
          componentDefinitions={componentDefinitions}
          onSelected={addComponent}
        />
      </PanelHeader>
      <InspectedObjectInfo icon={<EntityDefinitionIcon />} name={value.name} />
      <ComponentInitializerList
        items={value.components}
        definitions={componentDefinitions}
        onChange={updateComponents}
        elevation={0}
      />
    </>
  );
};
