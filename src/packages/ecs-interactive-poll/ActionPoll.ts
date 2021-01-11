import { CancelablePromise } from "cancelable-promise";
import { SystemModule } from "../ecs/SystemModule";
import { System } from "../ecs/System";
import { createActions } from "../ecs-interactive/createActions";
import { InteractionResult } from "../ecs-interactive/InteractionResult";

export class ActionPoll implements SystemModule {
  system?: System;
  result?: InteractionResult;
  private promise?: CancelablePromise<number>;

  constructor(private question: string, private poll: Poll) {}

  update() {
    this.pollForAction();
  }

  private pollForAction() {
    if (!this.system) {
      throw new Error("Can't poll without system");
    }
    if (this.promise) {
      this.promise.cancel();
      this.promise = undefined;
    }
    const actions = createActions(this.system);
    if (!actions.length) {
      return;
    }
    const actionNames = actions.map((action) => action.name);
    this.promise = this.poll(this.question, actionNames);
    this.promise.then(this.onPollResult);
  }

  private onPollResult = (winningIndex: number) => {
    if (!this.system) {
      throw new Error("Can't handle poll result without system");
    }
    const actions = createActions(this.system);
    const action = actions[winningIndex];
    if (action) {
      this.result = action.perform();
    }
  };
}

type Poll = (question: string, answers: string[]) => CancelablePromise<number>;
