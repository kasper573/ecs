import * as zod from "zod";
import { Component } from "../ecs/Component";

export const interactiveProperties = {
  action: { type: zod.string().optional(), defaultValue: undefined },
  perform: {
    type: zod.function(
      zod.tuple([]),
      zod.union([zod.string().optional(), zod.void()])
    ),
    defaultValue: () => {},
  },
};

export const Interactive = Component.extend(interactiveProperties);
