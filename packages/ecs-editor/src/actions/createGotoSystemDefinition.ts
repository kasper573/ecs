import { push } from "connected-react-router";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";

export const createGotoSystemDefinition = (id: SystemDefinitionId) =>
  push(createGotoSystemDefinitionPath(id));

export const createGotoSystemDefinitionPath = (id: string) => `/system/${id}`;
