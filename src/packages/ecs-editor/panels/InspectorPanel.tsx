import React from "react";
import { PanelName } from "../components/PanelName";
import { useSelector } from "../store";
import { selectInspectedObject } from "../selectors/selectInspectedObject";
import { InspectedObjectEditor } from "../editors/InspectedObjectEditor";
import { Panel } from "../components/Panel";
import { PanelHeader } from "../components/PanelHeader";

export const InspectorPanel = () => {
  const inspected = useSelector(selectInspectedObject);
  return (
    <Panel name={PanelName.Inspector}>
      {inspected ? (
        <InspectedObjectEditor value={inspected} />
      ) : (
        <PanelHeader title={PanelName.Inspector} />
      )}
    </Panel>
  );
};
