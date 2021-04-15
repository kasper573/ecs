import { createMemoryHistory } from "history";
import { mockEditorState } from "../functions/mockEditorState";
import { createRootState } from "../store";
import { selectAll } from "./selectAll";
import { selectComponentDefinition } from "./selectComponentDefinition";
import { selectECS } from "./selectECS";
import { selectEditorSelection } from "./selectEditorSelection";
import { selectEntityDefinition } from "./selectEntityDefinition";
import { selectHasSystems } from "./selectHasSystems";
import { selectInspectedObject } from "./selectInspectedObject";
import { selectLibraryNode } from "./selectLibraryNode";
import { selectListOfComponentDefinition } from "./selectListOfComponentDefinition";
import { selectListOfEntityDefinition } from "./selectListOfEntityDefinition";
import { selectListOfLibraryFolder } from "./selectListOfLibraryFolder";
import { selectListOfLibraryNode } from "./selectListOfLibraryNode";
import { selectSelectedEntityInitializer } from "./selectSelectedEntityInitializer";
import { selectSelectedSystemDefinition } from "./selectSelectedSystemDefinition";
import { selectSelectedLibraryNode } from "./selectSelectedLibraryNode";

// Suite disabled until createMemoizedSelector has been properly implemented
describe("selector returns identical values given the same parameters", () => {
  const history = createMemoryHistory();
  const editorState = mockEditorState();
  const rootState = createRootState(history, editorState);
  const cDef = Object.values(editorState.ecs.componentDefinitions)[0];
  const eDef = Object.values(editorState.ecs.entityDefinitions)[0];
  const system = Object.values(editorState.ecs.systems)[0];

  test("selectAll", () => testIdentity(selectAll, editorState));
  test("selectComponentDefinition", () =>
    testIdentity(selectComponentDefinition, editorState, cDef.id));
  test("selectECS", () => testIdentity(selectECS, editorState));
  test("selectEditorSelection", () =>
    testIdentity(selectEditorSelection, editorState));
  test("selectEntityDefinition", () =>
    testIdentity(selectEntityDefinition, editorState, eDef.id));
  test("selectHasSystems", () => testIdentity(selectHasSystems, editorState));
  test("selectInspectedObject", () =>
    testIdentity(selectInspectedObject, editorState));
  test("selectLibraryNode", () =>
    testIdentity(selectLibraryNode, editorState, eDef.nodeId));
  test("selectListOfComponentDefinition", () =>
    testIdentity(selectListOfComponentDefinition, rootState, system.id));
  test("selectListOfEntityDefinition", () =>
    testIdentity(selectListOfEntityDefinition, rootState, system.id));
  test("selectListOfLibraryFolder", () =>
    testIdentity(selectListOfLibraryFolder, rootState, system.id));
  test("selectListOfLibraryNode", () =>
    testIdentity(selectListOfLibraryNode, rootState, system.id));
  test("selectSelectedEntityInitializer", () =>
    testIdentity(selectSelectedEntityInitializer, editorState));
  test("selectSelectedLibraryNode", () =>
    testIdentity(selectSelectedLibraryNode, editorState));
  test("selectSelectedSystemDefinition", () =>
    testIdentity(selectSelectedSystemDefinition, rootState));
});

function testIdentity<T extends (...args: any) => any>(
  selector: T,
  ...params: Parameters<T>
) {
  const a = selector(...params);
  const b = selector(...params);
  expect(a).toBe(b);
}
