import * as zod from "zod";
import { Component } from "../../ecs/Component";

export const interactiveProperties = {
  action: { type: zod.string().optional() },
  effect: { type: zod.string().optional() },
};

export const Interactive = Component.extend(interactiveProperties);
