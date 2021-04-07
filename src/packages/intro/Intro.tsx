import { TooltipProps } from "@material-ui/core";
import styled from "styled-components";
import React, { useContext, useEffect, useMemo } from "react";
import { IntroId, IntroMount, MountId } from "./types/IntroState";
import { selectOpenMount } from "./functions/selectOpenMount";
import { nextMountId } from "./functions/nextMountId";
import { IntroContext } from "./IntroContext";
import { IntroTooltip } from "./IntroTooltip";
import { zIndex as dimmerZIndex } from "./IntroDimmer";

export type IntroProps = {
  introId: IntroId;
  message: string;
  when?: IntroMount["when"];
  children: TooltipProps["children"] | IntroChildrenRenderer;
};

export type IntroChildrenRenderer = (props: {
  isIntroVisible: boolean;
}) => TooltipProps["children"];

export const Intro = ({
  children,
  introId,
  message,
  when = true,
}: IntroProps) => {
  const mountId = useMemo<MountId>(nextMountId, []);
  const [state, dispatch] = useContext(IntroContext);

  useEffect(() => {
    dispatch({ type: "SET", mount: { mountId, introId, when } });
    return () => {
      dispatch({ type: "REMOVE", mountId });
    };
  }, [dispatch, introId, mountId, message, when]);

  const renderChildren =
    typeof children === "function" ? children : () => children;

  const open = selectOpenMount(state);
  if (open?.mountId !== mountId) {
    return renderChildren({ isIntroVisible: false });
  }

  return (
    <IntroContent>
      <IntroTooltip title={message} introId={open.introId}>
        {renderChildren({ isIntroVisible: true })}
      </IntroTooltip>
    </IntroContent>
  );
};

const IntroContent = styled.span`
  position: relative;
  z-index: ${({ theme }) => dimmerZIndex(theme) + 1};
`;
