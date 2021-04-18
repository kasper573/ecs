import { push } from "connected-react-router";
import { core } from "../core";
import { systemRoute } from "../routes/systemRoute";
import { EditorStore } from "../store";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";

export function* createDeleteSystemDefinitionAction(
  deleteId: SystemDefinitionId,
  store: EditorStore
) {
  yield core.actions.deleteSystemDefinition(deleteId);
  const currentLocation = store.getState().router.location;
  const currentSystemId = systemRoute.match(currentLocation)?.params.id;
  if (currentSystemId === deleteId) {
    yield push("/");
  }
}
