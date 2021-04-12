import * as zod from "zod";
import { Component } from "../../../ecs/src/Component";

export const Describable = Component.extend({
  description: { type: zod.string(), defaultValue: "" },
});
