import React, { memo } from "react";
import { PanelName } from "../types/PanelName";
import { useSelector } from "../store";
import { selectInspectedObject } from "../selectors/selectInspectedObject";
import { InspectedObjectEditor } from "../editors/InspectedObjectEditor";
import { Panel } from "../components/Panel";
import { InspectorPanelHeader } from "../components/InspectorPanelHeader";

export const InspectorPanel = memo(() => {
  const inspected = useSelector(selectInspectedObject);
  return (
    <Panel name={PanelName.Inspector}>
      {inspected ? (
        <InspectedObjectEditor value={inspected} />
      ) : (
        <InspectorPanelHeader />
      )}
    </Panel>
  );
});
