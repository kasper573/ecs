import { MosaicNode, MosaicParent } from "react-mosaic-component";
import { MosaicKey } from "react-mosaic-component/lib/types";
import { getPathToKey } from "./getPathToKey";

describe("getPathToKey", () => {
  it("returns correct path for single node", () => {
    const single = "a";
    expect(getPathToKey(single, "a")).toEqual([]);
  });

  it("returns correct paths for tuple node", () => {
    const tuple = mockParent("a", "b");
    expect(getPathToKey(tuple, "a")).toEqual(["first"]);
    expect(getPathToKey(tuple, "b")).toEqual(["second"]);
  });

  it("returns correct paths for nested node", () => {
    const nested = mockParent(mockParent("a", "b"), mockParent("c", "d"));
    expect(getPathToKey(nested, "a")).toEqual(["first", "first"]);
    expect(getPathToKey(nested, "b")).toEqual(["first", "second"]);
    expect(getPathToKey(nested, "c")).toEqual(["second", "first"]);
    expect(getPathToKey(nested, "d")).toEqual(["second", "second"]);
  });
});

function mockParent<T extends MosaicKey>(
  first: MosaicNode<T>,
  second: MosaicNode<T>
): MosaicParent<T> {
  return {
    first,
    second,
    direction: "row",
    splitPercentage: 50,
  };
}
