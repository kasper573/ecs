import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";

export type ComponentDefinitionEditorProps = {
  value: ComponentDefinition;
};

export const ComponentDefinitionEditor = ({
  value,
}: ComponentDefinitionEditorProps) => (
  <>ComponentDefinitionEditor: {value.name}</>
);
