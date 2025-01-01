import { timelineUpgrades } from "@/core/timespace/timeline-upgrade";

const getConnections = (...nodes) => {
  const connections = [];
  nodes.reduce((last, curr) => {
    connections.push([last, curr]);
    return curr;
  });
  return connections;
};

class TimelineLayout {
  constructor() {
    this.timelineUpgrades = Object.values(timelineUpgrades.upgrades);
    this.connections = [
      ...getConnections(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 999, 9999),
      ...getConnections(1, 11),
    ];
  }
}

export const timelineLayout = new TimelineLayout();

export const timelineLayoutGap = 5;