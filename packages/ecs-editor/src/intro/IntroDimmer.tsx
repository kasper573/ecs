import styled, { DefaultTheme, useTheme } from "styled-components";
import { Backdrop as MuiBackdrop } from "@material-ui/core";
import React, { memo, useContext } from "react";
import { IntroContext } from "./IntroContext";
import { selectOpenMount } from "./functions/selectOpenMount";

export const IntroDimmer = memo(() => {
  const theme = useTheme();
  const [state] = useContext(IntroContext);
  const open = selectOpenMount(state) !== undefined;
  return <Backdrop open={open} style={{ zIndex: zIndex(theme) }} />;
});

export const zIndex = (theme: DefaultTheme) => theme.zIndex.drawer + 1;

const Backdrop = styled(MuiBackdrop)`
  z-index: ${({ theme }) => theme.zIndex.drawer};
`;
