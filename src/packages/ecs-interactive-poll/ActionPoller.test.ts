import { cancelable } from "cancelable-promise";
import { System } from "../ecs/System";
import { Entity } from "../ecs/Entity";
import { Interactive } from "../ecs-interactive/Interactive";
import { ActionPoller } from "./ActionPoller";

test("Can't poll without a system", () => {
  const poller = new ActionPoller("?", () => noRecursionAnswer(0));
  expect(() => poller.update()).toThrow();
});

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
  new System({
    modules: [poller],
    entities: [
      new Entity([
        new Interactive({
          action: "Foo",
          perform: () => "Foo",
        }),
      ]),
    ],
  });
  poller.update();
  poller.update();
  poller.update();
  expect(promises.length).toBe(4);
  expect(promises.filter((p) => p.isCanceled()).length).toBe(3);
});

test("Poll answers is equal to the system actions", () => {
  let answers: string[] = [];
  const poller = new ActionPoller("?", (q, a) => {
    answers = a;
    return noRecursionAnswer(0);
  });
  new System({
    modules: [poller],
    entities: [
      new Entity([
        new Interactive({
          action: "Foo",
          perform: () => "Foo",
        }),
        new Interactive({
          action: "Bar",
          perform: () => "Bar",
        }),
      ]),
    ],
  });
  expect(answers).toEqual(["Foo", "Bar"]);
});

test("Selected answer will perform the corresponding action", async () => {
  let didPerform = false;
  const poller = new ActionPoller("?", () => noRecursionAnswer(0));
  new System({
    modules: [poller],
    entities: [
      new Entity([
        new Interactive({
          action: "Foo",
          perform: () => {
            didPerform = true;
          },
        }),
      ]),
    ],
  });
  await poller.done;
  expect(didPerform).toEqual(true);
});

test("Selecting an invalid answer will not perform any action", async () => {
  let didPerform = false;
  const poller = new ActionPoller("?", () => noRecursionAnswer(-1));
  new System({
    modules: [poller],
    entities: [
      new Entity([
        new Interactive({
          action: "Foo",
          perform: () => {
            didPerform = true;
          },
        }),
      ]),
    ],
  });
  await poller.done;
  expect(didPerform).toEqual(false);
});

test("Poll won't start without system actions available", () => {
  let didPollStart = false;
  const poller = new ActionPoller("?", () => {
    didPollStart = true;
    return noRecursionAnswer(0);
  });
  new System({ modules: [poller] });
  expect(didPollStart).toEqual(false);
});

test("Poll result won't be used if system has been detached", async () => {
  let system = new System({
    entities: [
      new Entity([
        new Interactive({
          action: "Foo",
          perform: () => "Foo",
        }),
      ]),
    ],
  });
  const poller = new ActionPoller("?", () => {
    system.modules.remove(poller);
    return noRecursionAnswer(0);
  });
  system.modules.push(poller);
  await expect(poller.end).rejects.toThrow();
});

test("Poll result can choose to prevent recursion", async () => {
  let count = 0;
  const poller = new ActionPoller("?", () =>
    cancelable(
      Promise.resolve({ answerIndex: 0, preventRecursion: !(count < 3) })
    )
  );
  new System({
    modules: [poller],
    entities: [
      new Entity([
        new Interactive({
          action: "Foo",
          perform: () => {
            count++;
          },
        }),
      ]),
    ],
  });
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
  new System({
    modules: [poller],
    entities: [
      new Entity([
        new Interactive({
          action: "Foo",
          perform: () => {
            performs++;
          },
        }),
      ]),
    ],
  });
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
