import { useDrop } from "react-dnd";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { DropTargetHookSpec } from "react-dnd/dist/types/hooks/types";

export type DropBoxSpec = DropTargetHookSpec<
  any,
  any,
  {
    canDrop: boolean;
    isOver: boolean;
  }
>;

export type DropBoxProps = PropsWithChildren<{
  spec: DropBoxSpec;
}>;

export const DropBox = ({ children, spec }: DropBoxProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(spec);
  return (
    <Box ref={drop} $show={canDrop} $highlight={isOver}>
      {canDrop && children}
    </Box>
  );
};

const Box = styled.div<{ $show: boolean; $highlight: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  padding: ${({ theme }) => theme.spacing(2)}px;
  background-color: ${({ theme, $highlight }) =>
    $highlight ? theme.palette.success.main : undefined};
`;
