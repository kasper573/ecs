import { System } from "./System";

new System({ state: {}, sceneId: "test", scenes: { test: [] } });

// System.ts
test("system entities resolve to the the current scene entities by default", () => {});
test("system entities resolution can be customized to derive from system state", () => {});
test("system actions are derived from system entities", () => {});

// createActions.ts
test("creates expected actions for the specified entities", () => {});

// interpretCommand.ts
test("can find the matching action for a command", () => {});

// performCommand.test.ts
test("gets unknown command effect when performing an unknown command", () => {});
test("performing an action returns the expected effect", () => {});
test("performing an action invokes the specified function", () => {});

// Entity.ts
test("can derive entity components based on entity state", () => {});
test("can derive entity components based on system state", () => {});

// Container.ts
test("can remove item by reference", () => {});
test("can find item by type", () => {});
test("can filter items by type", () => {});
test("a required (but missing) item type throws error", () => {});
test("a required (and existing) item type returns item", () => {});
