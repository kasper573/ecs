import {
  MosaicDirection,
  MosaicNode,
  MosaicParent,
} from "react-mosaic-component";
import * as zod from "zod";
import { genericString } from "../../../../zod-extensions/genericString";
import { WindowId } from "./WindowId";

/**
 * The current state of all windows.
 * (Root node of graph structure. Null when there are no windows)
 */
export type WindowState = MosaicNode<WindowId> | null;

const windowIdSchema = genericString<WindowId>();

const mosaicParentSchema: zod.ZodSchema<MosaicParent<WindowId>> = zod.lazy(() =>
  zod.object({
    direction: genericString<MosaicDirection>(),
    first: mosaicNodeSchema,
    second: mosaicNodeSchema,
    splitPercentage: zod.number().optional(),
  })
);

const mosaicNodeSchema = zod.union([windowIdSchema, mosaicParentSchema]);

export const windowStateSchema = zod.union([zod.null(), mosaicNodeSchema]);
