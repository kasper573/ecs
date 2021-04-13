import { IconButton } from "@material-ui/core";
import { memo, useContext } from "react";
import { SystemSyncContext } from "../hooks/useSystemSync";
import { ResetIcon } from "../icons";
import { Panel } from "../components/Panel";
import { PanelName } from "../types/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { IntroWithDefaultTooltip } from "../intro/IntroWithDefaultTooltip";
import { RenderTarget } from "../../../ecs-render-target/RenderTarget";

export const RuntimePanel = memo(() => {
  const [system, resetSystem] = useContext(SystemSyncContext);
  return (
    <Panel name={PanelName.Runtime}>
      <PanelHeader title={PanelName.Runtime}>
        <IntroWithDefaultTooltip
          defaultTooltip={{ title: "Reset runtime" }}
          introId="WhatIsRuntimeReset"
          message={
            "Sometimes it's useful to force reset the runtime. " +
            "Press reset runtime to return the current system to its original state."
          }
        >
          <IconButton
            edge="end"
            aria-label="Reset runtime"
            onClick={resetSystem}
          >
            <ResetIcon />
          </IconButton>
        </IntroWithDefaultTooltip>
      </PanelHeader>
      <RenderTarget system={system} />
    </Panel>
  );
});
