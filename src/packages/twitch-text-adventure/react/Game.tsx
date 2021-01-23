import React from "react";
import styled from "styled-components";
import { performCommand } from "../../ecs-interactive/performCommand";
import { describeSystem } from "../../ecs-describable/describeSystem";
import { System } from "../../ecs/System";
import { Console } from "./Console";

export type GameProps = {
  system: System;
  timeLeft: number;
  votesPerAction: number[];
};

export const Game = ({ system, timeLeft, votesPerAction }: GameProps) => {
  return (
    <MaximizedConsole onCommand={(command) => performCommand(system, command)}>
      {`${describeSystem(system, {
        describeAction: (action, index) =>
          `${index + 1}. ${action.name} (${votesPerAction[index] || 0} votes)`,
      })}
Time left: ${Math.round(timeLeft / 1000)}s`}
      <VoteInstruction>
        Vote by typing one of the action numbers into twitch chat.
      </VoteInstruction>
    </MaximizedConsole>
  );
};

const VoteInstruction = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const MaximizedConsole = styled(Console)`
  height: 100%;
`;
