import styled from "styled-components";
import { Theme } from "@material-ui/core/styles";
import { EditorPanelName } from "./EditorPanelName";

const panelSpacing = ({ theme }: { theme: Theme }) => theme.spacing(1);

/**
 * Controls the layout for all editor panels.
 * - Displays the scene to the left and the rest of the panels to the right on desktop.
 * - Displays all panels vertically on mobile.
 * (Expects EditorPanels as children)
 */
export const EditorPanelContainer = styled.div`
  display: grid;
  flex: 1;
  overflow: hidden;
  gap: ${panelSpacing}px ${panelSpacing}px;
  grid-template-columns: auto 300px 300px;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "${EditorPanelName.Scene} ${EditorPanelName.Instances} ${
  EditorPanelName.Inspector
}"
    "${EditorPanelName.Scene} ${EditorPanelName.Scenes} ${
  EditorPanelName.Library
}"
  ;
  ${({ theme }) => theme.breakpoints.down("xs")} {
    grid-template-columns: auto;
    grid-template-rows: auto auto auto auto auto;
    grid-template-areas:
      "${EditorPanelName.Scene}"
      "${EditorPanelName.Inspector}"
      "${EditorPanelName.Instances}"
      "${EditorPanelName.Library}"
      "${EditorPanelName.Scenes}"
    ;
  },
`;
