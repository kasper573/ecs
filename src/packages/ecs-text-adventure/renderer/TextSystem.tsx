import React, { PropsWithChildren, useEffect, useReducer } from "react";
import { performCommand } from "../interactive/performCommand";
import {
  describeSystem,
  SystemDescribers,
} from "../describable/describeSystem";
import { System } from "../../ecs/System";
import { Console, ConsoleProps } from "./Console";

export type TextSystemProps = Omit<ConsoleProps, "onCommand"> &
  PropsWithChildren<{
    system: System;
    describers?: SystemDescribers;
  }>;

export const TextSystem = ({
  system,
  describers,
  children,
  ...consoleProps
}: TextSystemProps) => {
  const [, refresh] = useReducer((n) => n + 1, 0);
  useEffect(() => {
    system?.events.on("update", refresh);
    return () => {
      system?.events.off("update", refresh);
    };
  }, [system]);
  return (
    <Console
      onCommand={(command) => performCommand(system, command)}
      {...consoleProps}
    >
      {describeSystem(system, {
        describeAction: (action, index) => `${index + 1}. ${action.name}`,
        ...describers,
      })}
      {children}
    </Console>
  );
};
