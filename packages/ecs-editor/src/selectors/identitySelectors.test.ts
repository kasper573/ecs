import { mockEditorState } from "../functions/mockEditorState";
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
  const state = mockEditorState();
  const cDef = Object.values(state.ecs.componentDefinitions)[0];
  const eDef = Object.values(state.ecs.entityDefinitions)[0];
  const system = Object.values(state.ecs.systems)[0];

  test("selectAll", () => testIdentity(selectAll, state));
  test("selectComponentDefinition", () =>
    testIdentity(selectComponentDefinition, state, cDef.id));
  test("selectECS", () => testIdentity(selectECS, state));
  test("selectEditorSelection", () =>
    testIdentity(selectEditorSelection, state));
  test("selectEntityDefinition", () =>
    testIdentity(selectEntityDefinition, state, eDef.id));
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
  test("selectSelectedEntityInitializer", () =>
    testIdentity(selectSelectedEntityInitializer, state));
  test("selectSelectedLibraryNode", () =>
    testIdentity(selectSelectedLibraryNode, state));
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
