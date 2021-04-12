import styled from "styled-components";
import { useDrop } from "react-dnd";
import { CommonTreeItemProps } from "./CommonTreeItem";

type CommonTreeDropDividerProps<T, Id extends string> = {
  destination: T | undefined;
  order: number;
  depth?: number;
} & Pick<CommonTreeItemProps<T, Id>, "dropSpec">;

export function CommonTreeDropDivider<T, Id extends string>({
  order,
  destination,
  dropSpec,
  depth = 0,
}: CommonTreeDropDividerProps<T, Id>) {
  const [{ canDrop }, drop] = useDrop(dropSpec(destination, order));

  return (
    <DropZonePlacement $depth={depth}>
      <DropZoneSize ref={drop}>
        <DropZoneLine $visible={canDrop} />
      </DropZoneSize>
    </DropZonePlacement>
  );
}

const DropZonePlacement = styled.div<{ $depth: number }>`
  height: 0;
  position: relative;
  z-index: ${
    ({ $depth }) =>
      1 + // +1 To place above CommonTreeItem
      $depth // + depth to place above ancestor drop dividers
  };
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
