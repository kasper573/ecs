import { Describable } from "../ecs-text/Describable";

new Describable({ describe: () => "" });

test("inventory entities are not described", () => {});
test("inventory entities actions are enabled", () => {});
