import { EditorAction } from "./EditorAction";
import { EditorObjectName } from "./EditorObjects";
import { EditorObjectOperation } from "./EditorObjectOperation";

/**
 * EditorAction convention for the specified object and operation
 */
export type EditorObjectAction<
  Operation extends EditorObjectOperation,
  ObjectName extends EditorObjectName,
  Payload
> = EditorAction<EditorObjectActionType<Operation, ObjectName>, Payload>;

/**
 * The EditorAction["type"] for the specified object and operation
 */
export type EditorObjectActionType<
  Operation extends EditorObjectOperation,
  ObjectName extends EditorObjectName
> = `${Uppercase<Operation>}_${Uppercase<ObjectName>}`;

export const createObjectActionType = <
  ObjectName extends EditorObjectName,
  Operation extends EditorObjectOperation
>(
  objectName: ObjectName,
  operation: Operation
) =>
  `${operation.toUpperCase()}_${objectName.toUpperCase()}` as EditorObjectActionType<
    Operation,
    ObjectName
  >;
