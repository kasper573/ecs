import styled from "styled-components";
import { EditorPanelName } from "./EditorPanelName";
import { EditorPanelFlat } from "./EditorPanelFlat";

/**
 * Displays the selected scene
 */
export const EditorScenePanel = styled(EditorPanelFlat).attrs({
  name: EditorPanelName.Scene,
})``;
