import { SystemModule } from "../ecs/SystemModule";
import { System } from "../ecs/System";
import { Action } from "../ecs-interactive/Action";
import { createActions } from "../ecs-interactive/createActions";
import { InteractionResult } from "../ecs-interactive/InteractionResult";

export class ActionPoll implements SystemModule {
  system?: System;
  result?: InteractionResult;

  constructor(private question: string, private poll: Poll) {}

  pollForAction() {
    if (!this.system) {
      throw new Error("Can't poll without system");
    }
    return pollForAction(this.poll, this.question, createActions(this.system));
  }

  async update() {
    const action = await this.pollForAction();
    if (action) {
      this.result = action.perform();
    }
  }
}

type Poll = (question: string, answers: string[]) => Promise<number>;

const pollForAction = async (
  poll: Poll,
  question: string,
  actions: Action[]
) => {
  if (!actions.length) {
    return;
  }
  const actionNames = actions.map((action) => action.name);
  const winningIndex = await poll(question, actionNames);
  return actions[winningIndex];
};
