import styled from "styled-components";
import { useDrop } from "react-dnd";
import { CommonTreeItemProps } from "./CommonTreeItem";

type CommonTreeDropDividerProps<T, Id extends string> = {
  destination: T | undefined;
  order: number;
} & Pick<CommonTreeItemProps<T, Id>, "onMoveNode" | "dropSpec">;

export function CommonTreeDropDivider<T, Id extends string>({
  order,
  destination,
  onMoveNode,
  dropSpec,
}: CommonTreeDropDividerProps<T, Id>) {
  const [{ canDrop }, drop] = useDrop(dropSpec(destination, handleDrop));

  function handleDrop(dragged: T) {
    if (canDrop && onMoveNode) {
      onMoveNode(dragged, destination, order);
    }
  }

  return (
    <DropZonePlacement>
      <DropZoneSize ref={drop}>
        <DropZoneLine $visible={canDrop} />
      </DropZoneSize>
    </DropZonePlacement>
  );
}

const DropZonePlacement = styled.div`
  height: 0;
  position: relative;
  z-index: 1; // To place above CommonTreeItem
`;

const DropZoneSize = styled.div`
  height: 10px;
  left: 0;
  right: 0;
  top: -5px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DropZoneLine = styled.div<{ $visible: boolean }>`
  height: 3px;
  background: ${({ theme }) => theme.palette.primary.dark};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
`;
