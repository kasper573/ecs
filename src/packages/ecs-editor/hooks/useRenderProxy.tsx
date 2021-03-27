import EventEmitter from "events";
import React, {
  ComponentProps,
  JSXElementConstructor,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import TypedEmitter from "typed-emitter";
import { useAsRef } from "../../ecs-common/useAsRef";

export type AnyComponent<P = any> =
  | keyof JSX.IntrinsicElements
  | JSXElementConstructor<P>;

/**
 * Renders the specified component but exposes a setProps function that allows
 * you to change the props of the component without re-rendering. Useful for modals.
 * @param component The component to render
 * @param baseProps The base props to pass to the component
 */
export function useRenderProxy<T extends AnyComponent>(
  component: T,
  baseProps: RenderProxyPayload<T>
) {
  const events = useMemo<RenderProxyEvents<T>>(() => new EventEmitter(), []);
  const setProps = useCallback(
    (payload: RenderProxyPayload<T>) => events.emit("payload", payload),
    [events]
  );
  const proxy = (
    <RenderProxy
      events={events}
      component={component}
      basePayload={baseProps}
    />
  );
  return [setProps, proxy] as const;
}

type RenderProxyPayload<T extends AnyComponent> = Partial<ComponentProps<T>>;

type RenderProxyEvents<T extends AnyComponent> = TypedEmitter<{
  payload: (payload: RenderProxyPayload<T>) => void;
}>;

type RenderProxyProps<T extends AnyComponent> = {
  events: RenderProxyEvents<T>;
  component: T;
  basePayload: RenderProxyPayload<T>;
};

function RenderProxy<T extends AnyComponent>({
  events,
  component,
  basePayload,
}: RenderProxyProps<T>) {
  const [payload, setPayload] = useState<RenderProxyPayload<T>>(basePayload);
  const payloadRef = useAsRef(payload);
  useEffect(() => {
    events.on("payload", (payload) =>
      setPayload({ ...payloadRef.current, ...payload })
    );
    return () => {
      events.removeAllListeners();
    };
  }, [events, payloadRef]);
  return React.createElement(component, payload);
}
