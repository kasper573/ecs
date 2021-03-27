import { mockEditorState } from "../mocks/mockEditorState";
import { values } from "../../nominal";
import { selectAll } from "./selectAll";
import { selectComponentDefinition } from "./selectComponentDefinition";
import { selectDefaultSelectionValue } from "./selectDefaultSelectionValue";
import { selectECS } from "./selectECS";
import { selectEditorSelection } from "./selectEditorSelection";
import { selectEntityDefinition } from "./selectEntityDefinition";
import { selectEntityInitializersFor } from "./selectEntityInitializersFor";
import { selectHasScenes } from "./selectHasScenes";
import { selectHasSystems } from "./selectHasSystems";
import { selectInspectedObject } from "./selectInspectedObject";
import { selectLibraryNode } from "./selectLibraryNode";
import { selectListOfComponentDefinition } from "./selectListOfComponentDefinition";
import { selectListOfEntityDefinition } from "./selectListOfEntityDefinition";
import { selectListOfLibraryFolder } from "./selectListOfLibraryFolder";
import { selectListOfLibraryNode } from "./selectListOfLibraryNode";
import { selectListOfSceneDefinition } from "./selectListOfSceneDefinition";
import { selectSelectedEntityInitializer } from "./selectSelectedEntityInitializer";
import { selectSelectedSystemDefinition } from "./selectSelectedSystemDefinition";
import { selectSelectedSceneDefinition } from "./selectSelectedSceneDefinition";
import { selectSelectedLibraryNode } from "./selectSelectedLibraryNode";

describe("selector returns identical values given the same parameters", () => {
  const state = mockEditorState();
  const cDef = values(state.ecs.componentDefinitions)[0];
  const eDef = values(state.ecs.entityDefinitions)[0];
  const system = values(state.ecs.systems)[0];

  test("selectAll", () => testIdentity(selectAll, state));
  test("selectComponentDefinition", () =>
    testIdentity(selectComponentDefinition, state, cDef.id));
  test("selectDefaultSelectionValue", () =>
    testIdentity(selectDefaultSelectionValue, state, "system"));
  test("selectECS", () => testIdentity(selectECS, state));
  test("selectEditorSelection", () =>
    testIdentity(selectEditorSelection, state));
  test("selectEntityDefinition", () =>
    testIdentity(selectEntityDefinition, state, eDef.id));
  test("selectEntityInitializersFor", () =>
    testIdentity(selectEntityInitializersFor, state, eDef));
  test("selectHasScenes", () =>
    testIdentity(selectHasScenes, state, system.id));
  test("selectHasSystems", () => testIdentity(selectHasSystems, state));
  test("selectInspectedObject", () =>
    testIdentity(selectInspectedObject, state));
  test("selectLibraryNode", () =>
    testIdentity(selectLibraryNode, state, eDef.nodeId));
  test("selectListOfComponentDefinition", () =>
    testIdentity(selectListOfComponentDefinition, state, system.id));
  test("selectListOfEntityDefinition", () =>
    testIdentity(selectListOfEntityDefinition, state, system.id));
  test("selectListOfLibraryFolder", () =>
    testIdentity(selectListOfLibraryFolder, state, system.id));
  test("selectListOfLibraryNode", () =>
    testIdentity(selectListOfLibraryNode, state, system.id));
  test("selectListOfSceneDefinition", () =>
    testIdentity(selectListOfSceneDefinition, state, system.id));
  test("selectSelectedEntityInitializer", () =>
    testIdentity(selectSelectedEntityInitializer, state));
  test("selectSelectedLibraryNode", () =>
    testIdentity(selectSelectedLibraryNode, state));
  test("selectSelectedSceneDefinition", () =>
    testIdentity(selectSelectedSceneDefinition, state));
  test("selectSelectedSystemDefinition", () =>
    testIdentity(selectSelectedSystemDefinition, state));
});

function testIdentity<T extends (...args: any) => any>(
  selector: T,
  ...params: Parameters<T>
) {
  const a = selector(...params);
  const b = selector(...params);
  expect(a).toBe(b);
}
