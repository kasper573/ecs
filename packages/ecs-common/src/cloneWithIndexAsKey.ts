import { cloneElement } from "react";

export const cloneWithIndexAsKey = (
  element: JSX.Element | false | undefined | null,
  index: number
) => (element ? cloneElement(element, { key: index }) : null);
