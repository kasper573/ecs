import { ReactNode } from "react";
import {
  IconButton,
  Toolbar as MuiToolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "../store";
import { core } from "../core";
import { selectThemeType } from "../selectors/selectThemeType";
import { DarkThemeIcon, LightThemeIcon } from "../components/icons";
import { DevToolsButton } from "../components/DevToolsButton";
import { UserActions } from "./UserActions";

export type ToolbarProps = { title?: ReactNode };

export const Toolbar = ({ title }: ToolbarProps) => {
  const dispatch = useDispatch();
  const themeType = useSelector(selectThemeType);
  const nextThemeType = themeType === "light" ? "dark" : "light";
  const ThemeToggleIcon = themeToggleIcons[themeType];
  const themeToggleTooltip = themeToggleTooltips[themeType];
  const toggleTheme = () => dispatch(core.actions.setThemeType(nextThemeType));

  return (
    <Container>
      {title}
      <Grow />
      <Actions>
        <DevToolsButton />
        <Tooltip title={themeToggleTooltip}>
          <IconButton aria-label={themeToggleTooltip} onClick={toggleTheme}>
            <ThemeToggleIcon />
          </IconButton>
        </Tooltip>
        <UserActions />
      </Actions>
    </Container>
  );
};

const Container = styled(MuiToolbar).attrs({ disableGutters: true })`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Grow = styled.span`
  flex: 1;
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
