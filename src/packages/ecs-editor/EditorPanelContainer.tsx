import styled from "styled-components";

/**
 * Arranges editor panels horizontally on desktop, vertically on mobile
 */
export const EditorPanelContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flex: 1,
  [theme.breakpoints.down("xs")]: {
    flexDirection: "column",
  },
}));
