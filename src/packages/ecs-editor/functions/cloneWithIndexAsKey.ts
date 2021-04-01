import { cloneElement } from "react";

export const cloneWithIndexAsKey = (element: JSX.Element, index: number) =>
  cloneElement(element, { key: index });
