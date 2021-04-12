import { XYCoord, useDragLayer } from "react-dnd";
import styled from "styled-components";
import { memo } from "react";
import { zIndex } from "../zIndex";
import { DNDType } from "./DNDType";
import { DragPreviewForItem } from "./DragPreviewForItem";

export const DragLayer = memo(() => {
  const { isDragging, itemType, item, currentOffset } = useDragLayer(
    (monitor) => ({
      itemType: monitor.getItemType(),
      item: monitor.getItem(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );
  const isKnownType = Object.values(DNDType).includes(itemType as DNDType);
  if (!isKnownType || !isDragging || !currentOffset) {
    return null;
  }
  return (
    <Position {...createTransform(currentOffset)}>
      <DragPreviewForItem type={itemType as DNDType} item={item} />
    </Position>
  );
});

const createTransform = ({ x, y }: XYCoord) => ({
  style: {
    transform: `translate(${x}px, ${y}px)`,
  },
});

const Position = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: ${zIndex.dragLayer};
`;
