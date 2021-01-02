// performCommand.test.ts
import { World } from "./World";

new World("test", { test: [] });

test("performing an action returns the expected effect", () => {});
test("performing an action stores the expected effect in world state", () => {});
test("performing an action invokes the specified function", () => {});
test("gets unknown command effect when performing an unknown command", () => {});
test("gets unknown command effect when performing an unknown command", () => {});

// createActions.ts
test("creates expected actions for the specified entities", () => {});

// interpretCommand.ts
test("can find the matching action for a command", () => {});

// Entity.ts
test("can derive entity components based on entity state", () => {});
test("can derive entity components based on world state", () => {});

// Container.ts
test("can remove item by reference", () => {});
test("can find item by type", () => {});
test("can filter items by type", () => {});
test("a required (but missing) item type throws error", () => {});
test("a required (and existing) item type returns item", () => {});
