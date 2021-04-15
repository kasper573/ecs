import { ComponentDefinition } from "../../../ecs-serializable/src/definition/ComponentDefinition";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { ComponentDefinitionIcon } from "../components/icons";

export type ComponentDefinitionEditorProps = {
  value: ComponentDefinition;
};

export const ComponentDefinitionEditor = ({
  value,
}: ComponentDefinitionEditorProps) => (
  <>
    <InspectedObjectInfo icon={<ComponentDefinitionIcon />} name={value.name} />
  </>
);
