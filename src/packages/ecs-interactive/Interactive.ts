import * as zod from "zod";
import { Component } from "../ecs/Component";

export const interactiveProperties = {
  action: { type: zod.string().optional(), defaultValue: undefined },
  effect: {
    type: zod.string().optional(),
    defaultValue: undefined,
  },
};

export const Interactive = Component.extend(interactiveProperties);
