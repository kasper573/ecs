import styled from "styled-components";
import { Paper, PaperProps } from "@material-ui/core";
import { CSSProperties, forwardRef } from "react";
import { PanelName } from "../types/PanelName";

type PanelVariant = CSSProperties["flexDirection"];

export type PanelProps = Omit<PaperProps, "variant"> & {
  name?: PanelName;
  variant?: PanelVariant;
};

const PanelBase = forwardRef(
  (
    { children, variant = "column", name, style, ...paperProps }: PanelProps,
    ref
  ) => (
    <Paper ref={ref} {...paperProps} style={{ ...style, gridArea: name }}>
      <PanelContent $variant={variant}>{children}</PanelContent>
    </Paper>
  )
);

/**
 * A Paper with a title (if name is specified).
 * Panel name will be used to specify a gridArea.
 * (Should be a child of EditorPanelContainer for layout to work properly)
 */
export const Panel = styled(PanelBase)`
  overflow-x: hidden;
  ${({ theme }) => theme.breakpoints.up("sm")} {
    overflow-y: auto;
  }
  // Expects parent node to define bounds
  width: 100%;
  height: 100%;
`;

const PanelContent = styled.div<{ $variant: PanelVariant }>`
  // Ensure children with position absolute is relative
  // to panel content regardless of scroll position
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: ${({ $variant }) => $variant};
`;
