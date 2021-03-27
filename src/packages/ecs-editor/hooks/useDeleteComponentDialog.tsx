import React, { useState } from "react";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { DeleteDialog } from "../components/DeleteDialog";
import { useSelector } from "../store";
import { selectComponentDefinition } from "../selectors/selectComponentDefinition";

export const useDeleteComponentDialog = (
  deleteComponent: (component: ComponentInitializer) => void
) => {
  const [component, setComponent] = useState<ComponentInitializer>();
  const isOpen = !!component;
  const definition = useSelector((state) =>
    selectComponentDefinition(state, component?.definitionId)
  );

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
