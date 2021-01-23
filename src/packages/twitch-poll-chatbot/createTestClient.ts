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
) => {
  const mock = MockedClient({}) as TestClient;
  mock.events = events;
  // Lazy: Should bind all EventEmitter methods, but I'm just binding the ones we use.
  mock.on = events.on.bind(events);
  mock.once = events.once.bind(events);
  mock.removeListener = events.removeListener.bind(events);
  return mock;
};

export type TestClient = Client & { events: TypedEmitter<Events> };

const MockedClient = mocked(Client);
