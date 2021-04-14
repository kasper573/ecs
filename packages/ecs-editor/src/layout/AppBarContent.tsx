import { memo } from "react";
import { IconButton, Toolbar as MuiToolbar, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "../store";
import { core } from "../core";
import { selectThemeType } from "../selectors/selectThemeType";
import { DarkThemeIcon, LightThemeIcon } from "../icons";
import { FileMenu } from "./FileMenu";
import { DevToolsButton } from "./DevToolsButton";
import { UserActions } from "./UserActions";

export const AppBarContent = memo(() => {
  const dispatch = useDispatch();
  const themeType = useSelector(selectThemeType);
  const nextThemeType = themeType === "light" ? "dark" : "light";
  const ThemeToggleIcon = themeToggleIcons[themeType];
  const themeToggleTooltip = themeToggleTooltips[themeType];
  const toggleTheme = () => dispatch(core.actions.setThemeType(nextThemeType));

  return (
    <Toolbar>
      <FileMenu edge="start" />
      <Actions>
        <DevToolsButton />
        <Tooltip title={themeToggleTooltip}>
          <IconButton aria-label={themeToggleTooltip} onClick={toggleTheme}>
            <ThemeToggleIcon />
          </IconButton>
        </Tooltip>
        <UserActions />
      </Actions>
    </Toolbar>
  );
});

const Toolbar = styled(MuiToolbar).attrs({ disableGutters: true })`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Actions = styled.div`
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
