import { IconButton, Tooltip } from "@material-ui/core";
import React, { useCallback } from "react";
import { PanelName } from "../components/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { useDispatch, useSelector } from "../store";
import { AddIcon, SceneIcon } from "../components/icons";
import { CrudList } from "../components/CrudList";
import { core } from "../core";
import { omit } from "../../ecs-common/omit";
import { Panel } from "../components/Panel";
import { useCrudDialogs } from "../hooks/useCrudDialogs";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { uuid } from "../../ecs-common/uuid";
import { selectListOfSceneDefinition } from "../selectors/selectListOfSceneDefinition";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { selectSelectedSceneDefinition } from "../selectors/selectSelectedSceneDefinition";

export const ScenesPanel = () => {
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const selectedScene = useSelector(selectSelectedSceneDefinition);
  const scenes = useSelector(selectListOfSceneDefinition);
  const dispatch = useDispatch();
  const [sceneEvents, sceneDialogs] = useCrudDialogs<SceneDefinition>({
    createDialogTitle: "Add scene",
    getItemName: (item) => item.name,
    onCreateItem: (name) =>
      dispatch(
        core.actions.createSceneDefinition({
          id: uuid(),
          name,
          systemId: selectedSystem?.id!,
        })
      ),
    onRenameItem: (scene, name) =>
      dispatch(
        core.actions.renameSceneDefinition({
          sceneId: scene.id,
          name,
        })
      ),
    onDeleteItem: (scene) =>
      dispatch(core.actions.deleteSceneDefinition(scene.id)),
  });
  const handleSceneSelected = useCallback(
    (scene) => dispatch(core.actions.setSelectedSceneDefinition(scene.id)),
    [dispatch]
  );

  return (
    <Panel name={PanelName.Scenes}>
      {sceneDialogs}
      <PanelHeader title={PanelName.Scenes}>
        {selectedSystem && (
          <Tooltip title="Add scene">
            <IconButton
              edge="end"
              aria-label="add scene"
              onClick={sceneEvents.onCreateItem}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </PanelHeader>
      <CrudList
        title={PanelName.Scenes}
        active={selectedScene}
        items={scenes}
        getItemProps={getItemProps}
        getItemKey={getItemKey}
        onSelectItem={handleSceneSelected}
        {...omit(sceneEvents, "onCreateItem")}
      />
    </Panel>
  );
};

const getItemKey = ({ id }: SceneDefinition) => id;

const getItemProps = ({ name }: SceneDefinition) => ({ name, icon: SceneIcon });
