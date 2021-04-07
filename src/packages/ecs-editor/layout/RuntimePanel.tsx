import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { useSystemSync } from "../hooks/useSystemSync";
import { ResetIcon } from "../icons";
import { Panel } from "../components/Panel";
import { PanelName } from "../types/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { RenderTarget } from "../components/RenderTarget";
import { Intro } from "../../intro/Intro";

export const RuntimePanel = () => {
  const [system, resetSystem] = useSystemSync();
  return (
    <Panel name={PanelName.Runtime}>
      <PanelHeader title={PanelName.Runtime}>
        <Intro
          introId="WhatIsRuntimeReset"
          message="Sometimes it's useful to force reset the runtime. Press reset runtime to return the current system to its original state."
        >
          <Tooltip title="Reset runtime" onClick={resetSystem}>
            <IconButton edge="end" aria-label="Reset runtime">
              <ResetIcon />
            </IconButton>
          </Tooltip>
        </Intro>
      </PanelHeader>
      <RenderTarget system={system} />
    </Panel>
  );
};
