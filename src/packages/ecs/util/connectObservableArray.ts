import { ObservableArray, ObservableArrayEvents } from "./ObservableArray";

export function connectObservableArray<T>(
  obs: ObservableArray<T>,
  handleChange: ObservableArrayEvents<T>["change"]
) {
  handleChange(Array.from(obs), []);
  obs.events.on("change", handleChange);
  return () => {
    obs.events.off("change", handleChange);
    handleChange([], Array.from(obs));
  };
}
