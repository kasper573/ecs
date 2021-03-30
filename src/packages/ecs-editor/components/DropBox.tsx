import { useDrop } from "react-dnd";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { DropTargetHookSpec } from "react-dnd";

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
    <Modal ref={drop} $show={canDrop}>
      <Box $highlight={isOver}>{children}</Box>
    </Modal>
  );
};

const Box = styled.div<{ $highlight: boolean }>`
  position: sticky;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
`;

const Modal = styled.div<{ $show: boolean }>`
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: ${({ theme }) =>
    theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    })};
  pointer-events: ${({ $show }) => ($show ? "inherit" : "none")};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
`;
