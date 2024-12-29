import { Currency } from "../currency";

export class TimelineUpgrade {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.description = config.description;
    this.reward = condif.reward;
    this.position = config.position;
    this.parent = config.parent;
    if (this.parent)
      this.condition = () => TU(this.parent).condition();
    else this.condition = config.condition;
    this.maxBuyCount = config.maxBuyCount;
    this.costFn = config.costFn ? config.costFn : () => 0;
  }

  getDescription() {
    return this.description();
  }

  getReward() {
    return this.reward();
  }

  getCost() {
    return this.costFn(this.buyCount);
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
    this.upgrades = Object.fromEntries(Object.entries(config).map(([id, ugr]) => new TimelineUpgrade({ id, ...ugr })));
  }

  getUpgrade(id) {
    return this.upgrades[id];
  }
}

export const TU_GROUP = {
  THE_MOMENT_YOU_DOOMED: 1,
};

export const timelineUpgrades = new TimelineUpgrades({
  1: {
    name: "The Moment You Start Over",
    description: "Travel back to the start",
    reward: "Regain the Continuum",
    condition: () => true,
    position: [0, 0],
  },
  11: {
    parent: TU_GROUP.THE_MOMENT_YOU_DOOMED,
    name: "",
  }
});

/**
 * Get access to a Timeline Upgrade
 * @param {number} id
 * @returns {TimelineUpgrade}
 */
export const TU = id => timelineUpgrades.getUpgrade(id);