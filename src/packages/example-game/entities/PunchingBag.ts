import { Describable } from "../../ecs-text-adventure/describable/Describable";
import { Interactive } from "../../ecs-text-adventure/interactive/Interactive";
import { Entity } from "../../ecs/Entity";

const maxHealth = 3;

export class PunchingBag extends Entity {
  hp = maxHealth;

  get isBroken() {
    return this.hp <= 0;
  }

  punch(power: number = 1) {
    this.hp -= power;
  }

  constructor() {
    super();
    this.components.push(
      new Describable({
        description: () =>
          `There's a punching bag. ${
            describeBagState(this.hp, maxHealth).description
          }`,
      }),
      new Interactive({
        action: "Punch bag",
        isActive: () => !this.isBroken,
        effect: () => {
          const { punchResult } = describeBagState(this.hp, maxHealth);
          this.punch();
          return punchResult;
        },
      })
    );
  }
}

const describeBagState = (currentHp: number, maxHp: number) => {
  if (currentHp === maxHp) {
    return {
      description: "It's in perfect shape.",
      punchResult:
        "You punch the damn perfect bag. You wish you could be in perfect shape too.",
    };
  }
  if (currentHp > maxHp / 2) {
    return {
      description: "It's looking bruised.",
      punchResult: "You punch the bag. You feel way better about yourself.",
    };
  }
  if (currentHp > 0) {
    return {
      description: "It's falling apart.",
      punchResult:
        'The punching bag breaks. You say out loud "I just wanted to destroy something beautiful".',
    };
  }
  return {
    description: "It is broken.",
  };
};
