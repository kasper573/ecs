import { IconButton } from "@material-ui/core";
import { useContext } from "react";
import { SystemSyncContext } from "../../hooks/useSystemSync";
import { ResetIcon } from "../../components/icons";
import { Panel, PanelProps } from "../../components/Panel";
import { PanelName } from "../../types/PanelName";
import { PanelHeader } from "../../components/PanelHeader";
import { IntroWithDefaultTooltip } from "../../intro/IntroWithDefaultTooltip";
import { RenderTarget } from "../../../../ecs-render-target/RenderTarget";

export const RuntimePanel = (props: PanelProps) => {
  const [system, resetSystem] = useContext(SystemSyncContext);
  return (
    <Panel name={PanelName.Runtime} {...props}>
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
};
