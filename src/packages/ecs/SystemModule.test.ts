import { SystemModule } from "./SystemModule";
import { System } from "./System";
import { Component } from "./Component";
import { Entity } from "./Entity";

describe("system modules", () => {
  test("are given a reference to their system on initialization", () => {
    const mod: SystemModule = {};
    const system = new System({ modules: [mod] });
    expect(mod.system).toBe(system);
  });

  test("are given a reference to their system when added after initialization", () => {
    const mod: SystemModule = {};
    const system = new System();
    system.modules.push(mod);
    expect(mod.system).toBe(system);
  });

  test("loses the reference to their system when removed from the system", () => {
    const mod: SystemModule = {};
    const system = new System({ modules: [mod] });
    system.modules.remove(mod);
    expect(mod.system).toBeUndefined();
  });

  test("receive update calls on system initialize", () => {
    let updated = false;
    const mod: SystemModule = { update: () => (updated = true) };
    new System({ modules: [mod] });
    expect(updated).toBe(true);
  });

  test("receive update calls on system update calls", () => {
    let updated = false;
    const mod: SystemModule = { update: () => (updated = true) };
    const system = new System({ modules: [mod] });
    updated = false;
    system.update();
    expect(updated).toBe(true);
  });

  test("receive update calls when added to a system", () => {
    let updated = false;
    const mod: SystemModule = { update: () => (updated = true) };
    const system = new System();
    system.modules.push(mod);
    expect(updated).toBe(true);
  });
});
