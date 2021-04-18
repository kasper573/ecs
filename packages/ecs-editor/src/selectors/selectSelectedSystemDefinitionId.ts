import { EditorRootState } from "../store";
import { systemRoute } from "../routes/systemRoute";

export const selectSelectedSystemDefinitionId = ({ router }: EditorRootState) =>
  systemRoute.match(router.location)?.params.id;
