import React from "react";
import styled from "styled-components";
import { System } from "../ecs/System";
import { TextSystem } from "../ecs-text-adventure/renderer/TextSystem";

export type GameProps = {
  system: System;
  timeLeft: number;
  votesPerAction: number[];
};

export const Game = ({ system, timeLeft, votesPerAction }: GameProps) => (
  <MaximizedTextSystem
    system={system}
    describers={{
      describeAction: (action, index) =>
        `${index + 1}. ${action.name} (${votesPerAction[index] || 0} votes)`,
    }}
  >
    <div>Time left: {Math.round(timeLeft / 1000)}s</div>
    <VoteInstruction>
      Vote by typing one of the action numbers into twitch chat.
    </VoteInstruction>
  </MaximizedTextSystem>
);

const VoteInstruction = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const MaximizedTextSystem = styled(TextSystem)`
  height: 100%;
`;
