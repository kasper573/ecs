import styled from "styled-components";
import { Theme } from "@material-ui/core/styles";
import { EditorPanelName as panels } from "./EditorPanelName";

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
  grid-template-columns: 300px auto 300px 300px;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "${panels.Scenes} ${panels.Scene} ${panels.Instances} ${panels.Inspector}"
    "${panels.Scenes} ${panels.Scene} ${panels.Instances} ${panels.Library}"
  ;
  ${({ theme }) => theme.breakpoints.down("xs")} {
    grid-template-columns: auto;
    grid-template-rows: auto auto auto auto auto;
    grid-template-areas:
      "${panels.Scene}"
      "${panels.Inspector}"
      "${panels.Instances}"
      "${panels.Library}"
      "${panels.Scenes}"
    ;
  },
`;
