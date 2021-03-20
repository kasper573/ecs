import React, { useState } from "react";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { DeleteDialog } from "../components/DeleteDialog";

export const useDeleteComponentDialog = (
  deleteComponent: (component: ComponentInitializer) => void,
  definitions: ComponentDefinition[]
) => {
  const [component, setComponent] = useState<ComponentInitializer>();
  const isOpen = !!component;
  const definition = component
    ? definitions.find((def) => def.id === component.definitionId)
    : undefined;

  const handleClose = () => setComponent(undefined);
  const handleDelete = () => deleteComponent(component!);

  const dialog = (
    <DeleteDialog
      open={isOpen}
      onClose={handleClose}
      onDelete={handleDelete}
      name={definition?.name ?? ""}
    />
  );

  return [dialog, setComponent] as const;
};
