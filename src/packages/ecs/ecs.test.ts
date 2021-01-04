import { System } from "./System";

new System({ state: {}, sceneId: "test", scenes: { test: [] } });

// System.ts
test("system entities resolve to the the current scene entities by default", () => {});
test("system entities resolution can be customized to derive from system state", () => {});

// Entity.ts
test("can derive entity components based on entity state", () => {});
test("can derive entity components based on system state", () => {});

// Container.ts
test("can remove item by reference", () => {});
test("can find item by type", () => {});
test("can filter items by type", () => {});
test("a required (but missing) item type throws error", () => {});
test("a required (and existing) item type returns item", () => {});
