import { IconButton, Tooltip } from "@material-ui/core";
import { PanelName } from "../types/PanelName";
import { PanelHeader } from "../components/PanelHeader";
import { useDispatch, useSelector } from "../store";
import { AddIcon, SceneIcon } from "../icons";
import { CrudList } from "../components/CrudList";
import { core } from "../core";
import { Panel } from "../components/Panel";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { uuid } from "../../ecs-common/uuid";
import { selectListOfSceneDefinition } from "../selectors/selectListOfSceneDefinition";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { selectSelectedSceneDefinition } from "../selectors/selectSelectedSceneDefinition";
import { useDialog } from "../hooks/useDialog";
import { NameDialog } from "../components/NameDialog";
import { DeleteDialog } from "../components/DeleteDialog";

export const ScenesPanel = () => {
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const selectedScene = useSelector(selectSelectedSceneDefinition);
  const scenes = useSelector(selectListOfSceneDefinition);
  const dispatch = useDispatch();

  const showCreateDialog = useDialog((props) => (
    <NameDialog {...props} title="New scene" onSave={handleCreate} />
  ));

  const showRenameDialog = useDialog((props, scene: SceneDefinition) => (
    <NameDialog
      {...props}
      title={`Rename ${scene.name}`}
      defaultValue={scene.name}
      onSave={(name) => handleRename(scene, name)}
    />
  ));

  const showDeleteDialog = useDialog((props, scene: SceneDefinition) => (
    <DeleteDialog
      {...props}
      name={scene.name}
      onDelete={() => handleDelete(scene)}
    />
  ));

  function handleCreate(name: string) {
    dispatch(
      core.actions.createSceneDefinition({
        id: uuid(),
        name,
        systemId: selectedSystem?.id!,
      })
    );
  }

  function handleRename(scene: SceneDefinition, name: string) {
    dispatch(core.actions.renameSceneDefinition({ sceneId: scene.id, name }));
  }

  function handleDuplicate(scene: SceneDefinition) {
    dispatch(core.actions.duplicateSceneDefinition(scene.id));
  }

  function handleSelected(scene: SceneDefinition) {
    dispatch(core.actions.setSelectedSceneDefinition(scene.id));
  }

  function handleDelete(scene: SceneDefinition) {
    dispatch(core.actions.deleteSceneDefinition(scene.id));
  }

  return (
    <Panel name={PanelName.Scenes}>
      <PanelHeader title={PanelName.Scenes}>
        {selectedSystem && (
          <Tooltip title="New scene">
            <IconButton
              edge="end"
              aria-label="New scene"
              onClick={showCreateDialog}
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
        onSelectItem={handleSelected}
        onDuplicateItem={handleDuplicate}
        onDeleteItem={showDeleteDialog}
        onUpdateItem={showRenameDialog}
      />
    </Panel>
  );
};

const getItemKey = ({ id }: SceneDefinition) => id;

const getItemProps = ({ name }: SceneDefinition) => ({ name, icon: SceneIcon });
