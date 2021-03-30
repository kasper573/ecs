import React from "react";
import {
  IconButton,
  ListItemSecondaryAction,
  Tooltip,
} from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "../store";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { useDialog } from "../hooks/useDialog";
import { selectECS } from "../selectors/selectECS";
import { core } from "../core";
import { selectThemeType } from "../selectors/selectThemeType";
import { EditorTitle } from "./EditorTitle";
import { DarkThemeIcon, LightThemeIcon, SaveIcon } from "./icons";
import { SimpleDialog } from "./SimpleDialog";
import { DevTools } from "./DevTools";

export const AppBar = () => {
  const dispatch = useDispatch();
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const ecs = useSelector(selectECS);
  const themeType = useSelector(selectThemeType);
  const nextThemeType = themeType === "light" ? "dark" : "light";
  const ThemeToggleIcon = themeToggleIcons[themeType];
  const themeToggleTooltip = themeToggleTooltips[themeType];

  const [showSaveDialog, saveDialog] = useDialog((props) => (
    <SimpleDialog title="Save" {...props}>
      {props.open && <pre>{JSON.stringify(ecs, null, 2)}</pre>}
    </SimpleDialog>
  ));

  const toggleTheme = () => dispatch(core.actions.setThemeType(nextThemeType));

  return (
    <>
      <EditorTitle>{selectedSystem?.name}</EditorTitle>
      <Actions>
        <DevTools />
        <Tooltip title="Save">
          <IconButton aria-label="Save" onClick={showSaveDialog}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={themeToggleTooltip}>
          <IconButton
            aria-label={themeToggleTooltip}
            edge="end"
            onClick={toggleTheme}
          >
            <ThemeToggleIcon />
          </IconButton>
        </Tooltip>
      </Actions>
      {saveDialog}
    </>
  );
};

const Actions = styled(ListItemSecondaryAction)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const themeToggleIcons = {
  light: DarkThemeIcon,
  dark: LightThemeIcon,
};

const themeToggleTooltips = {
  light: "Use dark theme",
  dark: "Use light theme",
};
