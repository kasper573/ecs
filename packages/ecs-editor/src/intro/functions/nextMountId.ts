let mountIdCounter = 0;

export function nextMountId() {
  return "" + mountIdCounter++;
}
