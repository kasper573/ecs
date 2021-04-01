import { PanelHeader } from "../components/PanelHeader";
import { useDispatch, useSelector } from "../store";
import { SceneIcon } from "../icons";
import { CrudList } from "../components/CrudList";
import { core } from "../core";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { uuid } from "../../ecs-common/uuid";
import { selectListOfSceneDefinition } from "../selectors/selectListOfSceneDefinition";
import { selectSelectedSystemDefinition } from "../selectors/selectSelectedSystemDefinition";
import { selectSelectedSceneDefinition } from "../selectors/selectSelectedSceneDefinition";
import { useCrudDialogs } from "../hooks/useCrudDialogs";

export const ScenesPanel = () => {
  const selectedSystem = useSelector(selectSelectedSystemDefinition);
  const selectedScene = useSelector(selectSelectedSceneDefinition);
  const scenes = useSelector(selectListOfSceneDefinition);
  const dispatch = useDispatch();

  const [{ showRenameDialog, showDeleteDialog }, createButton] = useCrudDialogs(
    "scene",
    (scene) => scene.name,
    {
      create: handleCreate,
      rename: handleRename,
      remove: handleDelete,
    }
  );

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
    <>
      <PanelHeader title="Scenes">{selectedSystem && createButton}</PanelHeader>
      <CrudList
        title="Scenes"
        active={selectedScene}
        items={scenes}
        getItemProps={getItemProps}
        getItemKey={getItemKey}
        onSelectItem={handleSelected}
        onDuplicateItem={handleDuplicate}
        onDeleteItem={showDeleteDialog}
        onUpdateItem={showRenameDialog}
      />
    </>
  );
};

const getItemKey = ({ id }: SceneDefinition) => id;

const getItemProps = ({ name }: SceneDefinition) => ({ name, icon: SceneIcon });
