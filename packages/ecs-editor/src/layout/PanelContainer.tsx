import styled from "styled-components";
import { Theme } from "@material-ui/core/styles";
import { PanelName as panels } from "../types/PanelName";

const panelSpacing = ({ theme }: { theme: Theme }) => theme.spacing(1);

/**
 * Controls the layout for all editor panels.
 * (Expects EditorPanels as children)
 */
export const PanelContainer = styled.div`
  display: grid;
  flex: 1;
  overflow: hidden;
  gap: ${panelSpacing}px ${panelSpacing}px;
  grid-template-columns: auto 300px 300px;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "${panels.Runtime} ${panels.Hierarchy} ${panels.Inspector}"
    "${panels.Runtime} ${panels.Hierarchy} ${panels.Library}"
  ;
  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "${panels.Runtime} ${panels.Inspector}"
      "${panels.Hierarchy} ${panels.Library}"
    ;
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    grid-template-columns: auto;
    grid-template-rows: 220px 220px 220px 220px;
    grid-template-areas:
      "${panels.Runtime}"
      "${panels.Hierarchy}"
      "${panels.Inspector}"
      "${panels.Library}"
    ;
  },
`;
