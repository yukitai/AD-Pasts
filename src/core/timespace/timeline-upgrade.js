import { Currency } from "../currency";
import { DC } from "../constants";

import { Timespace } from "./timespace";

export class TimelineUpgrade {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.description = config.description ?? "";
    this.reward = config.reward ?? "";
    this.position = config.position;
    this.parent = config.parent;
    if (this.parent)
      this.condition = () => TU(this.parent).condition();
    else this.condition = config.condition;
    this.maxBuyCount = config.maxBuyCount ?? 0;
    this.costFn = config.costFn ? config.costFn : () => 0;
  }

  getDescription() {
    return typeof this.description === "function" ? this.description() : this.description;
  }

  getReward() {
    return typeof this.reward === "function" ? this.reward() : this.reward;
  }

  getCost() {
    if (!this.costFn) return null;
    return new Decimal(this.costFn(this.buyCount));
  }

  tryBuy() {
    if (this.buyCount >= this.maxBuyCount) return false;
    const cost = this.getCost();
    if (Currency.timeRemnants.lt(cost)) return false;
    Currency.timeRemnants.subtract(cost);
    this.buyCount += 1;
    return true;
  }

  get buyCount() {
    return player.extend.timespace.timeline.boughtUpgrades[this.id.toString()] ?? 0;
  }

  set buyCount(value) {
    if (this.maxBuyCount < value) return;
    player.extend.timespace.timeline.boughtUpgrades[this.id.toString()] = value;
  }

  get isUnlocked() {
    return this.buyCount > 0 || this.maxBuyCount === 0;
  }

  get isActive() {
    return this.isUnlocked && this.condition();
  }

  get canBuy() {
    return this.buyCount < this.maxBuyCount && Currency.timeRemnants.gte(this.getCost());
  }
}

export class TimelineUpgrades {
  constructor(config) {
    this.upgrades = Object.fromEntries(
      Object.entries(config).map(([id, ugr]) => [id, new TimelineUpgrade({ id: Number(id), ...ugr })]));
  }

  getUpgrade(id) {
    return this.upgrades[id];
  }
}

export const timelineUpgrades = new TimelineUpgrades({
  1: {
    name: "The Moment You Start Over",
    description: "Doom Your Reality Twice",
    reward: "Unlock Imaginary Dimensions",
    condition: () => Timespace.isUnlocked,
    position: [0, 0],
  },
  11: {
    name: "Regain Lai'tela's Continuum",
    parent: 1,
    maxBuyCount: 1,
    costFn: () => DC.D1,
    position: [-1, 1],
  },
  2: {
    name: "I'm Waiting For You",
    description: "Unlock the First Rift",
    reward: "You gain 10x Infinities",
    condition: () => PelleStrikes.infinity.hasStrike,
    position: [0, 1],
  },
  3: {
    name: "The Infinite Suffering",
    description: "Unlock the Second Rift",
    reward: "You gain Replicanti 10 times faster",
    condition: () => PelleStrikes.powerGalaxies.hasStrike,
    position: [0, 2],
  },
  4: {
    name: "I Need to Be Eternal",
    description: "Unlock the Third Rift",
    reward: "You gain 10x Eternal Points",
    condition: () => PelleStrikes.eternity.hasStrike,
    position: [0, 3],
  },
  5: {
    name: "Master Of Studies",
    description: "Unlock the Fourth Rift",
    reward: "All ECs' cost is set to 1",
    condition: () => PelleStrikes.ECs.hasStrike,
    position: [0, 4],
  },
  6: {
    name: "Time Is Meaningless",
    description: "Unlock the Fifth Rift",
    reward: "You gain Tachyon Particles 10 times faster",
    condition: () => PelleStrikes.dilation.hasStrike,
    position: [0, 5],
  },
  7: {
    name: "Escape the Ruins ...",
    description: "Collapse one time",
    reward: "",
    condition: () => false,
    position: [0, 6],
  },
  8: {
    name: "When You stand Here Again",
    description: "Reach 1e4000 EP after one collapse",
    reward: "",
    condition: () => false,
    position: [0, 7],
  },
  9: {
    name: "Doom the Doomed Things",
    description: "Collapse two times",
    reward: "",
    condition: () => false,
    position: [0, 8],
  },
  10: {
    name: "These Imaginary Things",
    description: "Enter Teresa's Past",
    reward: "",
    condition: () => false,
    position: [0, 9],
  },
  20: {
    name: "The Follower",
    description: "Enter Effarig's Past",
    reward: "",
    condition: () => false,
    position: [0, 10],
  },
  30: {
    name: "These Nameless Fairytales",
    description: "Enter the Nameless Ones' Past",
    reward: "",
    condition: () => false,
    position: [0, 11],
  },
  40: {
    name: "The Great Ones",
    description: "Enter V's Past",
    reward: "",
    condition: () => false,
    position: [0, 12],
  },
  50: {
    name: "The Stealer",
    description: "Enter Ra's Past",
    reward: "",
    condition: () => false,
    position: [0, 13],
  },
  60: {
    name: "Millions Above",
    description: "Enter Lai'tela's Past",
    reward: "",
    condition: () => false,
    position: [0, 14],
  },
  70: {
    name: "Goodbye, Antimatter Dimensions",
    description: "Enter Pelle's Past",
    reward: "",
    condition: () => false,
    position: [0, 15],
  },
  999: {
    name: "Nobody Knows",
    description: "Enter Your Past",
    reward: "The end of everything, all the truth in the world could be found here",
    condition: () => false,
    position: [0, 16],
  },
  9999: {
    name: "Is there any further place beyond infinity?",
    reward: "You gain a divisor to all debuffs in your Past and the divisor will reach Infinity in 160s",
    parent: 999,
    costFn: () => new Decimal("-1e9999"),
    maxBuyCount: 1,
    position: [0, 17],
  },
});

/**
 * Get access to a Timeline Upgrade
 * @param {number} id
 * @returns {TimelineUpgrade}
 */
export const TU = id => timelineUpgrades.getUpgrade(id);

window.TimelineUpgrades = timelineUpgrades;