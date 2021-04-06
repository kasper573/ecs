import { System } from "../../ecs/System";
import { Entity } from "../../ecs/Entity";
import { Interactive } from "./Interactive";
import { createActions } from "./createActions";
import { interpretCommand } from "./interpretCommand";

test("interpretCommand can find the matching action for a command", () => {
  const system = new System(
    new Entity([new Interactive({ action: "Do the thing" })])
  );
  const actions = createActions(system);
  const action = interpretCommand("Do the thing", actions);
  expect(action).toBe(actions[0]);
});
