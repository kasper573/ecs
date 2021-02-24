/**
 * An action that can be dispatched by the editor
 * (All actions available in the editor should use this)
 */
export type EditorAction<Type, Payload> = { type: Type } & Payload;
