import { DropTargetMonitor } from "react-dnd";
import { EntityDefinition } from "../../ecs-serializable/definition/EntityDefinition";
import { DNDType } from "./DNDType";

export const entityDefinitionDropSpec = (
  handleDrop: (def: EntityDefinition) => void
) => ({
  accept: DNDType.EntityDefinition,
  drop: (def: EntityDefinition) => handleDrop(def),
  collect: (monitor: DropTargetMonitor) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
});
