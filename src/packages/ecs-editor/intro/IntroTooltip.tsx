import { Button, Tooltip, TooltipProps, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import styled from "styled-components";
import { IntroContext } from "./IntroContext";
import { IntroId } from "./types/IntroState";

export type IntroTooltipProps = {
  title: string;
  introId: IntroId;
  children: TooltipProps["children"];
};

export const IntroTooltip = ({
  title,
  introId,
  children,
}: IntroTooltipProps) => {
  const [, dispatch] = useContext(IntroContext);
  return (
    <Tooltip
      open
      arrow
      interactive
      title={
        <TooltipContent>
          <Typography color="inherit">{title}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch({ type: "DISMISS", introId })}
          >
            Got it
          </Button>
        </TooltipContent>
      }
    >
      {children}
    </Tooltip>
  );
};

const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(1)}px;

  .MuiButton-root {
    margin-top: ${({ theme }) => theme.spacing(1)}px;
    align-self: flex-end;
  }
`;
