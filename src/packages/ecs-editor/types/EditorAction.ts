/**
 * An action that can be dispatched to the EditorReducer.
 * (All actions available in the editor should use this)
 */
export type EditorAction<T, P> = { type: T } & P;
