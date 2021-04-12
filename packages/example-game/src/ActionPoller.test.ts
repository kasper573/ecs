import { cancelable } from "cancelable-promise";
import { System } from "../../ecs/src/System";
import { Entity } from "../../ecs/src/Entity";
import { Interactive } from "../../ecs-text-adventure/src/interactive/Interactive";
import { ActionPoller } from "./ActionPoller";

test("Is ended by default", async () => {
  const poller = new ActionPoller("?", () => noRecursionAnswer(0));
  await expect(poller.end).resolves.toBeUndefined();
});

it("Cancels active poll on every new poll", () => {
  const promises: Array<ReturnType<typeof noRecursionAnswer>> = [];
  const poller = new ActionPoller("?", () => {
    const p = noRecursionAnswer(0);
    promises.push(p);
    return p;
  });
  poller.attach(
    new System(
      new Entity([
        new Interactive({
          action: "Foo",
          effect: () => "Foo",
        }),
      ])
    )
  );
  poller.pollForAction();
  poller.pollForAction();
  poller.pollForAction();
  expect(promises.length).toBe(4);
  expect(promises.filter((p) => p.isCanceled()).length).toBe(3);
});

test("Poll answers is equal to the system actions", () => {
  let answers: string[] = [];
  const poller = new ActionPoller("?", (q, a) => {
    answers = a;
    return noRecursionAnswer(0);
  });
  poller.attach(
    new System(
      new Entity([
        new Interactive({
          action: "Foo",
          effect: () => "Foo",
        }),
        new Interactive({
          action: "Bar",
          effect: () => "Bar",
        }),
      ])
    )
  );
  expect(answers).toEqual(["Foo", "Bar"]);
});

test("Selected answer will perform the corresponding action", async () => {
  let didPerform = false;
  const poller = new ActionPoller("?", () => noRecursionAnswer(0));
  poller.attach(
    new System(
      new Entity([
        new Interactive({
          action: "Foo",
          effect: () => {
            didPerform = true;
          },
        }),
      ])
    )
  );
  await poller.done;
  expect(didPerform).toEqual(true);
});

test("Selecting an invalid answer will not perform any action", async () => {
  let didPerform = false;
  const poller = new ActionPoller("?", () => noRecursionAnswer(-1));
  poller.attach(
    new System(
      new Entity([
        new Interactive({
          action: "Foo",
          effect: () => {
            didPerform = true;
          },
        }),
      ])
    )
  );
  await poller.done;
  expect(didPerform).toEqual(false);
});

test("Poll won't start without system actions available", () => {
  let didPollStart = false;
  const poller = new ActionPoller("?", () => {
    didPollStart = true;
    return noRecursionAnswer(0);
  });
  poller.attach(new System());
  expect(didPollStart).toEqual(false);
});

test("Poll result won't be used if system has been detached", async () => {
  const system = new System(
    new Entity([
      new Interactive({
        action: "Foo",
        effect: () => "Foo",
      }),
    ])
  );
  const poller = new ActionPoller("?", () => {
    poller.detach();
    return noRecursionAnswer(0);
  });
  poller.attach(system);
  await expect(poller.end).rejects.toThrow();
});

test("Poll result can choose to prevent recursion", async () => {
  let count = 0;
  const poller = new ActionPoller("?", () =>
    cancelable(
      Promise.resolve({ answerIndex: 0, preventRecursion: !(count < 3) })
    )
  );
  poller.attach(
    new System(
      new Entity([
        new Interactive({
          action: "Foo",
          effect: () => {
            count++;
          },
        }),
      ])
    )
  );
  await poller.done;
  expect(count).toBe(4);
});

test("Poll result can be numeric or options object", async () => {
  let performs = 0;
  const poller = new ActionPoller("?", () =>
    performs === 0
      ? cancelable(Promise.resolve(0))
      : cancelable(Promise.resolve({ answerIndex: 0, preventRecursion: true }))
  );
  poller.attach(
    new System(
      new Entity([
        new Interactive({
          action: "Foo",
          effect: () => {
            performs++;
          },
        }),
      ])
    )
  );
  await poller.done;
  expect(performs).toBe(2);
});

const noRecursionAnswer = (answerIndex: number) =>
  cancelable(
    Promise.resolve({
      answerIndex,
      preventRecursion: true,
    })
  );
