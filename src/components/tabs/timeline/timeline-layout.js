class TimelineLayout {
  constructor() {
    this.nodes = [];
  }

  addLine(...node) {
    this.nodes.push(node);
  }

  getInitialBits() {
    return this.nodes.map(row => {
      const cols = row.length;
      const bit32count = Math.ceil(cols / 32);
      return new Array(bit32count).fill(0);
    });
  }

  isBought(row, col) {
    const bitsOfRow = player.timespace.timelineBits[row];
    const idxOf32bit = Math.floor(col / 32);
    const idxOfbit = col % 32;
    return (bitsOfRow[idxOf32bit] << idxOfbit) & 1 > 0;
  }

  setIsBought(row, col) {
    const idxOf32bit = Math.floor(col / 32);
    const idxOfbit = col % 32;
    player.timespace.timelineBits[row][idxOf32bit] |=
      1 >> idxOfbit;
  }
}

export const timelineLayout = new TimelineLayout();

window.TimelineLayout = timelineLayout;

timelineLayout.addLine(
  {
    id: 0,
    name: "The Begin of Time",
    description: "Enable the 1st Antimatter Dimension in Lai'tela's Reality",
    cost: 1,
    onBuy: () => undefined,
  },
  {
    id: 1,
    name: "The Next Day",
    description: "Enable the 2nd Antimatter Dimension in Lai'tela's Reality",
    cost: 10,
    onBuy: () => undefined,
  },
);

timelineLayout.addLine(
  {
    id: 0,
    name: "Are You Still Here?",
    description: "Unlock Collapse, the Method to Modify the Universe",
    cost: 1e40,
    onBuy: () => undefined,
  },
);