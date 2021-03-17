import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import {
  SelectComponentDefinitionButton,
  SelectComponentDefinitionButtonProps,
} from "../components/SelectComponentDefinitionButton";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { createComponentInitializer } from "../../ecs-serializable/factories/createComponentInitializer";
import { uuid } from "../functions/uuid";
import { PanelHeader } from "../components/PanelHeader";
import { PanelName } from "../components/PanelName";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { EntityDefinitionIcon } from "../components/icons";
import { ComponentInitializerList } from "./ComponentInitializerList";

export type EntityDefinitionEditorProps = {
  value: EntityDefinition;
  onChange: (updated: EntityDefinition) => void;
} & Pick<SelectComponentDefinitionButtonProps, "componentDefinitions">;

export const EntityDefinitionEditor = ({
  value,
  componentDefinitions,
  onChange,
}: EntityDefinitionEditorProps) => {
  const addComponent = (definition: ComponentDefinition) => {
    onChange({
      ...value,
      components: [
        ...value.components,
        createComponentInitializer({
          id: uuid(),
          definitionId: definition.id,
        }),
      ],
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
        elevation={0}
      />
    </>
  );
};
