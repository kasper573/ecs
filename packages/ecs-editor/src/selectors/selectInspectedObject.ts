import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { getInspectedObject } from "../functions/getInspectedObject";

export const selectInspectedObject = createMemoizedSelector(
  getInspectedObject,
  (obj) => obj
);
