import React, { PropsWithChildren } from "react";
import { performCommand } from "../interactive/performCommand";
import {
  describeSystem,
  SystemDescribers,
} from "../describable/describeSystem";
import { System } from "../../../ecs/src/System";
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
}: TextSystemProps) => (
  <Console
    onCommand={(command) => performCommand(system, command)}
    {...consoleProps}
  >
    {describeSystem(system)}
    {children}
  </Console>
);
