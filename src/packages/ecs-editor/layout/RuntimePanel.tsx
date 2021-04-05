import { IconButton, Tooltip, Typography } from "@material-ui/core";
import React from "react";
import { TextSystem } from "../../ecs-react/TextSystem";
import { useSelector } from "../store";
import { useSystemSync } from "../hooks/useSystemSync";
import { ResetIcon } from "../icons";
import { FlatPanel } from "../components/FlatPanel";
import { Panel } from "../components/Panel";
import { PanelName } from "../types/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { selectHasSystems } from "../selectors/selectHasSystems";
import { selectHasScenes } from "../selectors/selectHasScenes";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { selectSelectedSceneDefinition } from "../selectors/selectSelectedSceneDefinition";

export const RuntimePanel = () => {
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const selectedScene = useSelector(selectSelectedSceneDefinition);
  const hasScenes = useSelector(selectHasScenes);
  const hasSystem = useSelector(selectHasSystems);
  const [system, resetSystem] = useSystemSync();

  if (!selectedSystem) {
    return (
      <FlatPanel>
        <Typography>
          {hasSystem ? "Please select a system" : "Please create a system"}
        </Typography>
      </FlatPanel>
    );
  }
  if (!selectedScene) {
    return (
      <FlatPanel>
        <Typography>
          {hasScenes ? "Please select a scene" : "Please create a scene"}
        </Typography>
      </FlatPanel>
    );
  }
  if (!system) {
    return (
      <FlatPanel>
        <Typography>No system available</Typography>
      </FlatPanel>
    );
  }

  return (
    <Panel name={PanelName.Runtime}>
      <PanelHeader title={PanelName.Runtime}>
        <Tooltip title="Reset runtime" onClick={resetSystem}>
          <IconButton edge="end" aria-label="Reset runtime">
            <ResetIcon />
          </IconButton>
        </Tooltip>
      </PanelHeader>
      <TextSystem system={system} />
    </Panel>
  );
};
