import EventEmitter from "events";
import { Fragment, memo, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DialogProps } from "@material-ui/core";
import TypedEmitter from "typed-emitter";
import { useAsRef } from "../../../ecs-common/src/useAsRef";
import { uuid } from "../../../ecs-common/src/uuid";
import { useEvents } from "./useEvents";

/**
 * Automates rendering and the open and onClose properties of dialogs.
 */
export function useDialog<Args extends unknown[]>(
  component: DialogComponent<Args>
) {
  const events: DialogEventEmitter<Args> = useContext(DialogEventsContext);
  const id = useMemo<DialogId>(uuid, []);
  const componentRef = useAsRef(component);

  const remove = useCallback(() => {
    events.emit("remove", id);
  }, [events, id]);

  const open = useCallback(
    (...args: Args) => {
      events.emit("add", id, componentRef.current, ...args);
      return new Promise<void>((resolve) => {
        events.once("didClose", (closedId) => {
          if (closedId === id) {
            resolve();
          }
        });
      });
    },
    [events, componentRef, id]
  );

  useEffect(() => remove, [remove]);

  return open;
}

export const Dialogs = memo(() => {
  const [state, setState] = useState<Record<DialogId, DialogState>>({});
  const events = useContext(DialogEventsContext);
  useEvents(events, {
    add,
    remove,
    open,
    close,
    didClose,
  });

  function updateDialog(id: DialogId, update: Partial<DialogState>) {
    setState((state) => ({
      ...state,
      [id]: { ...state[id], ...update },
    }));
  }
  function didClose() {}
  function add(id: DialogId, component: DialogComponent, ...args: unknown[]) {
    updateDialog(id, { isOpen: true, component, args });
  }
  function remove(id: DialogId) {
    setState((current) => {
      const updated = { ...current };
      delete updated[id];
      return updated;
    });
  }
  function open(id: DialogId, ...args: unknown[]) {
    updateDialog(id, { isOpen: true, args });
  }
  function close(id: DialogId) {
    events.emit("didClose", id);
    updateDialog(id, { isOpen: false });
  }
  return (
    <>
      {Object.keys(state).map((id) => {
        const { component, isOpen, args = [] } = state[id];
        const dialog = component(
          { open: isOpen, onClose: () => close(id) },
          ...args
        );
        return <Fragment key={id}>{dialog}</Fragment>;
      })}
    </>
  );
});

type DialogState<Args extends any[] = unknown[]> = {
  component: DialogComponent;
  isOpen: boolean;
  args?: Args;
};

type DialogId = string;

type DialogComponent<Args extends any[] = unknown[]> = (
  props: Pick<DialogProps, "open" | "onClose">,
  ...args: Args
) => ReactNode;

type DialogEvents<Args extends any[] = unknown[]> = {
  add: (id: DialogId, dialog: DialogComponent<Args>, ...args: Args) => void;
  remove: (id: DialogId) => void;
  open: (id: DialogId, ...args: Args) => void;
  close: (id: DialogId) => void;
  didClose: (id: DialogId) => void;
};

type DialogEventEmitter<Args extends any[] = unknown[]> = TypedEmitter<
  DialogEvents<Args>
>;

const DialogEventsContext = createContext<DialogEventEmitter>(
  new EventEmitter()
);
