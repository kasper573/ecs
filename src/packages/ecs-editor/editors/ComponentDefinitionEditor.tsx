import { ComponentDefinition } from "../../ecs-serializable/definition/ComponentDefinition";
import { InspectedObjectInfo } from "../components/InspectedObjectInfo";
import { ComponentDefinitionIcon } from "../icons";

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
