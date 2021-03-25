import React from "react";
import { PanelName } from "../components/PanelName";
import { useDispatch, useSelector } from "../store";
import { selectInspectedObject } from "../selectors/selectInspectedObject";
import { InspectedObjectEditor } from "../editors/InspectedObjectEditor";
import { Panel } from "../components/Panel";
import { InspectedObject } from "../types/InspectedObject";
import { core } from "../slices/core";
import { PanelHeader } from "../components/PanelHeader";

export const InspectorPanel = () => {
  const inspected = useSelector(selectInspectedObject);
  const dispatch = useDispatch();
  const saveInspectorChange = (updated: InspectedObject) => {
    switch (updated.type) {
      case "entityInitializer":
        dispatch(
          core.actions.updateEntityInitializer({
            entityId: updated.object.id,
            update: updated.object,
          })
        );
        break;
      case "libraryNode":
        dispatch(
          core.actions.updateLibraryNode({
            nodeId: updated.object.id,
            replacement: updated.object,
          })
        );
    }
  };
  return (
    <Panel name={PanelName.Inspector}>
      {inspected ? (
        <InspectedObjectEditor
          value={inspected}
          onChange={saveInspectorChange}
        />
      ) : (
        <PanelHeader title={PanelName.Inspector} />
      )}
    </Panel>
  );
};
