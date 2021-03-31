import { DropTargetMonitor } from "react-dnd";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { DNDType } from "./DNDType";

export const entityDefinitionDropSpec = (
  handleDrop: (def: EntityDefinition) => void
) => ({
  accept: DNDType.EntityDefinition,
  drop: handleDrop,
  collect: (monitor: DropTargetMonitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
});
