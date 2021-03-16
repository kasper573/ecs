import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";

export type EntityDefinitionEditorProps = {
  value: EntityDefinition;
};

export const EntityDefinitionEditor = ({
  value,
}: EntityDefinitionEditorProps) => <>EntityDefinitionEditor: {value.name}</>;
