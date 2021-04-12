import { IntroState } from "../types/IntroState";

const localStorageKey = "IntroBackdropState";

export function loadResolved(): IntroState["resolved"] {
  return JSON.parse(localStorage.getItem(localStorageKey) ?? "{}");
}

export function saveResolved(resolved: IntroState["resolved"]) {
  localStorage.setItem(localStorageKey, JSON.stringify(resolved));
}
