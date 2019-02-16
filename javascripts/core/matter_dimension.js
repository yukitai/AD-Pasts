/**
 * Constants for easily adjusting values
 */

const CHANCE_COST_MULT = 1.5
const INTERVAL_COST_MULT = 2.5
const POWER_COST_MULT = 3

const CHANCE_START_COST = 20
const INTERVAL_START_COST = 5
const POWER_START_COST = 10


// How much the starting costs increase per tier
const COST_MULT_PER_TIER = 100

class MatterDimensionState {
  constructor(tier) {
    this._tier = tier;
  }

  get dimension() {
    return player.celestials.laitela.dimensions[this._tier];
  }

  // In percents
  get chance() {
    return 6 - this._tier + this.dimension.chanceUpgrades
  }

  // In milliseconds
  get interval() {
    return Math.pow(0.89, this.dimension.intervalUpgrades) * Math.power(2, this._tier - 1) * 1000
  }

  get power() {
    return Math.pow(1.1, this.dimension.powerUpgrades)
  }

  get chanceCost() {
    return Math.pow(CHANCE_COST_MULT, this.dimension.chanceUpgrades) * Math.pow(COST_MULT_PER_TIER, this._tier - 1) * CHANCE_START_COST;
  }

  get intervalCost() {
    return Math.pow(INTERVAL_COST_MULT, this.dimension.chanceUpgrades) * Math.pow(COST_MULT_PER_TIER, this._tier - 1) * INTERVAL_START_COST;
  }

  get powerCost() {
    return Math.pow(POWER_COST_MULT, this.dimension.chanceUpgrades) * Math.pow(COST_MULT_PER_TIER, this._tier - 1) * POWER_START_COST;
  }


  get amount() {
    return this.dimension.amount;
  }

  set amount(value) {
    this.dimension.amount = value;
  }

  get lastUpdate() {
    return this.dimension.lastUpdate
  }

  set lastUpdate(ms) {
    this.dimension.lastUpdate = ms
  }


  buyChance() {
    if (this.chanceCost > player.celestials.laitela.matter) return false
    player.celestials.laitela.matter -= this.chanceCost
    this.dimension.chanceUpgrades++;
  }

  buyInterval() {
    if (this.intervalCost > player.celestials.laitela.matter) return false
    player.celestials.laitela.matter -= this.intervalCost
    this.dimension.intervalUpgrades++;
  }

  buyPower() {
    if (this.powerCost > player.celestials.laitela.matter) return false
    player.celestials.laitela.matter -= this.powerCost
    this.dimension.powerUpgrades++;
  }

}

MatterDimensionState.all = [1, 2, 3, 4].map(tier => new MatterDimensionState(tier));

/**
 * @param {number} tier
 * @return {NormalDimensionState}
 */
function MatterDimension(tier) {
  return MatterDimensionState.all[tier - 1];
}


/**
 * This will be called in a loop
 * if interval >= updaterate -> if lastupdate + interval is smaller than now it will be called
 * if interval < updaterate it will be called with diff each update
 */
function getMatterDimensionProduction(tier, ticks) {
  const d = MatterDimension(tier)

  let prod = 0

  if (d.amount < 100) {
    let x = 0
    while (x < d.amount) {
      if (Math.random() > d.chance) prod++;
    }
  } else {
    let x = 0
    while (x < 100) {
      if (Math.random() > d.chance) prod += Math.round(d.amount/100);
    }
  }

  prod *= this.power * ticks

  return Math.round(prod)
}

function matterDimensionLoop(diff) {

  for (let i = 1; i <= 4; i++) {
    let d = MatterDimension(i)

    if (d.lastUpdate + d.interval < Date.now()) {
      let ticks = Math.floor((Date.now() - d.lastUpdate) / d.interval)
      if (i == 1) player.celestials.laitela.matter += getMatterDimensionProduction(i, ticks)
      else MatterDimension(i - 1).amount += getMatterDimensionProduction(i, ticks)

      d.lastUpdate += ticks * d.interval
    }

  }

}