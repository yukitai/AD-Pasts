import { DC } from "../../../core/constants";

export class TimelinePoint {
  constructor(config) {
    this.title = config.title;
    this.condition = config.condition;
    this.description = config.description;
    this.chilren = config.children;
  }

  get isActive() {
    return this.condition();
  }

  getDescription() {
    return typeof this.description === "function" ? this.description() : this.description;
  }
}

export class TimelineUpgrade {
  constructor(config) {
    this.title = config.title;
    this.description = config.description;
    this.cost = config.cost;
    this.maxBuyCount = config.maxBuyCount;
    this.position = config.position;
    this.next = config.next;
    this.parent = config.parent;
    this.condition = config.condition;
  }

  get canBuy() {
    return this.condition ? this.condition() : true;
  }

  get buyCount() {
    return player.extend.timespace.timeline.boughtUpgrades[this.title] ?? 0;
  }

  set buyCount(value) {
    player.extend.timespace.timeline.boughtUpgrades[this.title] = value;
  }

  getDescription() {
    return typeof this.description === "function" ? this.description() : this.description;
  }

  getCost() {
    return this.cost(this.buyCount);
  }
}

export class TimelineLayout {
  constructor(config) {
    this.points = config.points;
    this.upgrades = Object.fromEntries(config.upgrades.map(it => [it.title, new TimelineUpgrade(it)]));
  }
}

export const timelineLayout = new TimelineLayout({
  points: [
    new TimelinePoint({
      condition: () => true,
      title: "The Moment You Doomed",
      description: "Doom your Reality",
      children: [
        "Travel in the Time",
      ],
    }),
    new TimelinePoint({
      condition: () => true,
      title: "I'm Waiting For You",
      description: "Unlock first Pelle's Strike",
      children: [],
    }),
  ],
  upgrades: [
    {
      title: "Travel in the Time",
      description: "Decrease the divisor of Remnants Gain by 0.02",
      cost: count => DC.E1.pow(count),
      maxBuyCount: 5,
      position: [-1, 0],
    }
  ],
});

window.timelineLayout = timelineLayout;