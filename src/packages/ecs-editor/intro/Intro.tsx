import { MenuItem, TooltipProps } from "@material-ui/core";
import styled from "styled-components";
import React, { useContext, useEffect, useMemo } from "react";
import { useContextMenu } from "../hooks/useContextMenu";
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
  canRestore?: boolean;
};

export type IntroChildrenRenderer = (props: {
  isIntroVisible: boolean;
}) => TooltipProps["children"];

export const Intro = ({
  children,
  introId,
  message,
  when = true,
  canRestore = true,
}: IntroProps) => {
  const mountId = useMemo<MountId>(nextMountId, []);
  const [state, dispatch] = useContext(IntroContext);
  let [contextMenuTrigger, contextMenu] = useContextMenu([
    <MenuItem onClick={restore}>What's this?</MenuItem>,
  ]);

  // Disable context menu if opting out of restore function
  if (!canRestore) {
    contextMenu = false;
    contextMenuTrigger = { onContextMenu: () => {} };
  }

  useEffect(() => {
    dispatch({ type: "SET", mount: { mountId, introId, when } });
    return () => {
      dispatch({ type: "REMOVE", mountId });
    };
  }, [dispatch, introId, mountId, message, when]);

  function restore() {
    dispatch({ type: "RESTORE", introId });
  }

  const renderChildren =
    typeof children === "function" ? children : () => children;

  const open = selectOpenMount(state);
  if (open?.mountId !== mountId) {
    return (
      <>
        {contextMenu}
        <span {...contextMenuTrigger}>
          {renderChildren({ isIntroVisible: false })}
        </span>
      </>
    );
  }

  return (
    <>
      {contextMenu}
      <IntroContent>
        <IntroTooltip title={message} introId={open.introId}>
          {renderChildren({ isIntroVisible: true })}
        </IntroTooltip>
      </IntroContent>
    </>
  );
};

const IntroContent = styled.span`
  position: relative;
  z-index: ${({ theme }) => dimmerZIndex(theme) + 1};
`;
