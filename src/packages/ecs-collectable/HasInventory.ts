import { Inventory } from "./Inventory";

export type HasInventory = {
  inventory: Inventory<HasInventory>;
};
