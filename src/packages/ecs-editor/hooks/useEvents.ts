import TypedEmitter from "typed-emitter";
import { useEffect } from "react";

export const useEvents = <Events>(
  events: TypedEmitter<Events>,
  handlers: Events
) => {
  useEffect(() => {
    for (const name in handlers) {
      events.on(name, handlers[name]);
    }
    return () => {
      for (const name in handlers) {
        events.off(name, handlers[name]);
      }
    };
  }, [events, handlers]);
};
