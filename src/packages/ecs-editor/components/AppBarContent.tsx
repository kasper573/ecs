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
import {
  DarkThemeIcon,
  DeleteIcon,
  EditIcon,
  LightThemeIcon,
  SaveIcon,
} from "../icons";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { EditorTitle } from "./EditorTitle";
import { SimpleDialog } from "./SimpleDialog";
import { DevTools } from "./DevTools";

export const AppBarContent = () => {
  const dispatch = useDispatch();
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const ecs = useSelector(selectECS);
  const themeType = useSelector(selectThemeType);
  const nextThemeType = themeType === "light" ? "dark" : "light";
  const ThemeToggleIcon = themeToggleIcons[themeType];
  const themeToggleTooltip = themeToggleTooltips[themeType];

  const showSaveDialog = useDialog((props) => (
    <SimpleDialog title="Save" {...props}>
      {props.open && <pre>{JSON.stringify(ecs, null, 2)}</pre>}
    </SimpleDialog>
  ));

  const [{ showRenameDialog, showDeleteDialog }] = useCrudDialogs(
    "system",
    (system) => system.name,
    { rename: handleSystemRename, remove: handleSystemDelete }
  );

  function handleSystemRename(system: SystemDefinition, name: string) {
    dispatch(
      core.actions.renameSystemDefinition({ systemId: system.id, name })
    );
  }

  function handleSystemDelete(system: SystemDefinition) {
    dispatch(core.actions.deleteSystemDefinition(system.id));
  }

  const toggleTheme = () => dispatch(core.actions.setThemeType(nextThemeType));

  return (
    <>
      <EditorTitle>
        {selectedSystem ? selectedSystem.name : "No system selected"}
      </EditorTitle>
      {selectedSystem && (
        <>
          <Tooltip title="Rename system">
            <IconButton
              aria-label="Rename system"
              onClick={() => showRenameDialog(selectedSystem)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete system">
            <IconButton
              aria-label="Delete system"
              onClick={() => showDeleteDialog(selectedSystem)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
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
