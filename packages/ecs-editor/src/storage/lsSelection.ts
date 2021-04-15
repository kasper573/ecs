import { EditorSelectionValues } from "../types/EditorSelection";

export function saveSelectionToLocalStorage(selection: EditorSelectionValues) {
  localStorage.setItem("selection", JSON.stringify(selection));
}

export function loadSelectionFromLocalStorage() {
  const selectionJsonString = localStorage.getItem("selection") as
    | string
    | undefined;
  return selectionJsonString
    ? (JSON.parse(selectionJsonString) as EditorSelectionValues)
    : undefined;
}
