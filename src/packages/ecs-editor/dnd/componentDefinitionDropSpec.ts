import { DropTargetMonitor } from "react-dnd";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { DNDType } from "./DNDType";

export const componentDefinitionDropSpec = (
  handleDrop: (def: ComponentDefinition) => void
) => ({
  accept: DNDType.ComponentDefinition,
  drop: handleDrop,
  collect: (monitor: DropTargetMonitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
});
