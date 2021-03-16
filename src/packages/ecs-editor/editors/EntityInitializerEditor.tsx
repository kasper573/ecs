import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";

export type EntityInitializerEditorProps = {
  value: EntityInitializer;
};

export const EntityInitializerEditor = ({
  value,
}: EntityInitializerEditorProps) => <>EntityInitializerEditor: {value.name}</>;
