import { useDispatch, useStore } from "../store";
import { SystemDefinition } from "../../../ecs-serializable/src/definition/SystemDefinition";
import { ECSDefinition } from "../../../ecs-serializable/src/definition/ECSDefinition";
import { ConfirmDialog } from "../dialogs/ConfirmDialog";
import { loadECSDefinitionsFromFS } from "../functions/loadECSDefinitionsFromFS";
import { getIntersectingSystemDefinitions } from "../functions/getIntersectingSystemDefinitions";
import { grammaticalJoin } from "../functions/grammaticalJoin";
import { core } from "../core";
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

  function commit(ecsList: ECSDefinition[]) {
    dispatch(core.actions.commitECSDefinitions(ecsList));
  }

  async function loadAndCommit() {
    const ecsList = await loadECSDefinitionsFromFS();
    const conflictingSystems = getIntersectingSystemDefinitions(
      store.getState().present.ecs,
      ecsList
    );
    if (conflictingSystems.length > 0) {
      showConfirmReplaceDialog(conflictingSystems, ecsList);
    } else {
      commit(ecsList);
    }
  }

  return loadAndCommit;
}
