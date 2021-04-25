import { Button, IconButton, Typography } from "@material-ui/core";
import { useContext } from "react";
import styled from "styled-components";
import { SystemSyncContext } from "../../hooks/useSystemSync";
import { ResetIcon } from "../../components/icons";
import { Panel, PanelProps } from "../../components/Panel";
import { PanelName } from "../../types/PanelName";
import { PanelHeader } from "../../components/PanelHeader";
import { IntroWithDefaultTooltip } from "../../intro/IntroWithDefaultTooltip";
import { RenderTarget } from "../../../../ecs-render-target/RenderTarget";
import { Center } from "../../components/Center";

export const RuntimePanel = (props: PanelProps) => {
  const [system, resetSystem, systemError] = useContext(SystemSyncContext);
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
      {systemError ? (
        <Center>
          <SystemErrorMessage>{systemError + ""}</SystemErrorMessage>
          <Button onClick={() => console.error(systemError)}>
            Log to console
          </Button>
        </Center>
      ) : (
        <RenderTarget system={system} />
      )}
    </Panel>
  );
};

const SystemErrorMessage = styled(Typography).attrs({ color: "error" })``;
