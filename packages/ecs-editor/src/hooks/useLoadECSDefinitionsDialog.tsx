import { useDispatch, useStore } from "../store";
import { SystemDefinition } from "../../../ecs-serializable/src/definition/SystemDefinition";
import { ECSDefinition } from "../../../ecs-serializable/src/definition/ECSDefinition";
import { ConfirmDialog } from "../dialogs/ConfirmDialog";
import { loadECSDefinitionsFromFS } from "../storage/fsECSDefinitions";
import { getIntersectingSystemDefinitions } from "../functions/getIntersectingSystemDefinitions";
import { grammaticalJoin } from "../functions/grammaticalJoin";
import { core } from "../core";
import { SimpleDialog } from "../dialogs/SimpleDialog";
import { useDialog } from "./useDialog";

export function useLoadECSDefinitionsDialog() {
  const store = useStore();
  const dispatch = useDispatch();
  const showConfirmReplaceDialog = useDialog(
    (
      props,
      conflictingSystems: SystemDefinition[],
      payload: ECSDefinition[]
    ) => {
      const noun = conflictingSystems.length > 1 ? "systems" : "system";
      const systemNames = grammaticalJoin(
        conflictingSystems.map((s) => `"${s.name}"`)
      );
      return (
        <ConfirmDialog
          {...props}
          title={`Replace ${noun}`}
          confirmLabel="Proceed"
          message={`The loaded ${noun} ${systemNames} already exist in the editor. Replace the ${noun}?`}
          onConfirm={() => commit(payload)}
        />
      );
    }
  );

  const showParseFailureDialog = useDialog((props, failedFiles: string[]) => {
    const noun = failedFiles.length > 1 ? "files" : "file";
    const fileNames = grammaticalJoin(failedFiles.map((name) => `"${name}"`));
    return (
      <SimpleDialog {...props} title={`Failed to parse ${noun}`}>
        The {noun} {fileNames} could not be loaded.
      </SimpleDialog>
    );
  });

  function commit(ecsList: ECSDefinition[]) {
    dispatch(core.actions.commitECSDefinitions(ecsList));
  }

  async function loadAndCommit() {
    const loadList = await loadECSDefinitionsFromFS();
    const loadedECSList: ECSDefinition[] = [];
    const failedFiles: string[] = [];
    for (const load of loadList) {
      if (load.result.type === "success") {
        loadedECSList.push(load.result.ecs);
      } else {
        failedFiles.push(load.file.name);
      }
    }

    if (failedFiles.length) {
      await showParseFailureDialog(failedFiles);
    }

    const conflictingSystems = getIntersectingSystemDefinitions(
      store.getState().editor.present.ecs,
      loadedECSList
    );

    if (conflictingSystems.length > 0) {
      showConfirmReplaceDialog(conflictingSystems, loadedECSList);
    } else {
      commit(loadedECSList);
    }
  }

  return loadAndCommit;
}
