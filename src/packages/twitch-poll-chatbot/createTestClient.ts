import { EventEmitter } from "events";
import { mocked } from "ts-jest/utils";
import { Client, Events } from "tmi.js";
import TypedEmitter from "typed-emitter";

/**
 * Mocks the tmi.js Client and overrides key members to funnel events
 * through a custom EventEmitter to allow tests to control and spy on events.
 */
export const createTestClient = (
  events: TypedEmitter<Events> = new EventEmitter()
) => ({
  ...MockedClient({}),
  events,

  // Lazy: Should bind all EventEmitter methods, but I'm just binding the ones we use.
  on: events.on.bind(events),
  once: events.once.bind(events),
  removeListener: events.removeListener.bind(events),

  say: async (channel: string, message: string) => {
    events.emit("message", channel, {}, message, true);
    return [message] as [string];
  },
  connect: async () => {
    const args = ["bogus", 0] as [string, number];
    events.emit("connected", ...args);
    return args;
  },
  disconnect: async () => {
    events.emit("disconnected", "bogus");
    return ["bogus", 0] as [string, number];
  },
});

export type TestClient = ReturnType<typeof createTestClient>;

const MockedClient = mocked(Client);
