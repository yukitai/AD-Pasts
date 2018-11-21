var repMs = 0;
function getMaxReplicantiChance() { // Also shows up in the replicanti autobuyer loop
  return nearestPercent(1 + getGlyphSacEffect("replication") / 100);
}

// Rounding errors suck
function nearestPercent(x) {
  return Math.round(100 * x) / 100;
}

function upgradeReplicantiChance() {
  const upgrade = ReplicantiUpgrade.chance;
  if (!ReplicantiUpgrade.isAvailable(upgrade)) return false;
  ReplicantiUpgrade.purchase(upgrade);
  return true;
}

function upgradeReplicantiInterval() {
  ReplicantiUpgrade.purchase(ReplicantiUpgrade.interval);
}

function upgradeReplicantiGalaxy() {
  const upgrade = ReplicantiUpgrade.galaxies;
  if (!ReplicantiUpgrade.isAvailable(upgrade)) return false;
  ReplicantiUpgrade.purchase(upgrade);
  return true;
}

function maxReplicantiGalaxy(diff) {
    var maxGal = player.replicanti.gal;
    var infiTime = Math.max(Math.log(Number.MAX_VALUE) / Math.log(player.replicanti.chance + 1) * getReplicantiInterval(true), 0);
    if (player.timestudy.studies.includes(131)) maxGal = Math.floor(player.replicanti.gal * 1.5);
    var curGal = player.replicanti.galaxies;
    let gainGal = 0;
    if (curGal < maxGal) { 
        if (diff / infiTime < maxGal - curGal) {
            gainGal = Math.floor(diff / infiTime);
            diff = diff % infiTime;
    }else {
        diff -= (maxGal - curGal) * infiTime; 
        gainGal = maxGal - curGal;
        }
        player.replicanti.galaxies += gainGal;
        player.galaxies -= 1;
        galaxyReset();
}
return diff;
}

function replicantiGalaxy() {
  if (!Replicanti.galaxies.canBuyMore) return;
  player.reality.upgReqChecks[0] = false;
  var galaxyGain = 1
  if (isAchEnabled("r126")) {
    if (player.replicanti.amount.e >= 616) {
      const maxGal = Replicanti.galaxies.max;
      galaxyGain = Math.min(Math.floor(player.replicanti.amount.e / 308), maxGal - player.replicanti.galaxies)
      player.replicanti.amount = player.replicanti.amount.dividedBy(new Decimal("1e" + (308 * galaxyGain)))
    }
    else player.replicanti.amount = player.replicanti.amount.dividedBy(Number.MAX_VALUE)
  }
  else player.replicanti.amount = new Decimal(1)
  player.replicanti.galaxies += galaxyGain
  player.galaxies -= 1
  galaxyReset();
}

function replicantiGalaxyAutoToggle(forcestate) {
  player.replicanti.galaxybuyer = !player.replicanti.galaxybuyer || forcestate === true;
}

function getReplicantiInterval(noMod, interval) {
    if (!interval) {
      interval = player.replicanti.interval;
    }
    if (player.timestudy.studies.includes(62)) interval = interval/3
    if (player.timestudy.studies.includes(133) || (player.replicanti.amount.gt(Number.MAX_VALUE) || noMod)) interval *= 10
    if (player.timestudy.studies.includes(213)) interval /= 20
    if (player.reality.rebuyables[2] > 0) interval /= Math.pow(3, player.reality.rebuyables[1])
    interval /= Math.max(1, getAdjustedGlyphEffect("replicationspeed"));
    if ((player.replicanti.amount.lt(Number.MAX_VALUE) || noMod) && isAchEnabled("r134")) interval /= 2
    if (player.replicanti.amount.gt(Number.MAX_VALUE) && !noMod) interval = Math.max(interval * Math.pow(1.2, (player.replicanti.amount.log10() - 308)/308), interval)
    if (player.reality.upg.includes(6)) interval /= 1+(player.replicanti.galaxies/50)
    return interval;
}

function replicantiLoop(diff) {
    if (diff > repMs) {
        diff -= repMs;
        repMs = 0;
    } else {
        repMs -= diff;
        return;
    }
    PerformanceStats.start("Replicanti");
    let interval = getReplicantiInterval();

    var est = Math.log(player.replicanti.chance+1) * 1000 / interval

    var current = player.replicanti.amount.ln();
    let speedCheck = Math.log(Number.MAX_VALUE) / Math.log(player.replicanti.chance + 1) * getReplicantiInterval(true) < diff / 2;
    if (speedCheck && player.replicanti.galaxybuyer && (!player.timestudy.studies.includes(131) || isAchEnabled("r138"))) diff = maxReplicantiGalaxy(diff);

    if (player.replicanti.unl && (diff > 500 || interval < 50 || player.timestudy.studies.includes(192))) {
        var gained = Decimal.pow(Math.E, current +(diff/100*est/10))
        if (player.timestudy.studies.includes(192)) gained = Decimal.pow(Math.E, current +Math.log((diff/100*est/10) * (Math.log10(1.2)/308)+1) / (Math.log10(1.2)/308))
        player.replicanti.amount = Decimal.min(Number.MAX_VALUE, gained)
        if (player.timestudy.studies.includes(192)) player.replicanti.amount = gained
        replicantiTicks = 0
    } else {
        if (interval <= replicantiTicks && player.replicanti.unl) {
            if (player.replicanti.amount.lte(100)) {
                var temp = player.replicanti.amount
                for (var i=0; temp.gt(i); i++) {
                    if (player.replicanti.chance > Math.random()) player.replicanti.amount = player.replicanti.amount.plus(1)
                }
            } else {
                var temp = Decimal.round(player.replicanti.amount.dividedBy(100))
                if (Math.round(player.replicanti.chance) !== 1) {
                    let counter = 0
                    for (var i=0; i<100; i++) {
                        if (player.replicanti.chance > Math.random()) {
                            counter++;
                        }
                    }
                    player.replicanti.amount = Decimal.min(Number.MAX_VALUE, temp.times(counter).plus(player.replicanti.amount))
                    if (player.timestudy.studies.includes(192)) player.replicanti.amount = temp.times(counter).plus(player.replicanti.amount)
                } else {
                    if (player.timestudy.studies.includes(192)) player.replicanti.amount = player.replicanti.amount.times(2)
                    else player.replicanti.amount = Decimal.min(Number.MAX_VALUE, player.replicanti.amount.times(2))
                }
            }
            replicantiTicks -= interval
        }
    }
    if (player.replicanti.amount !== 0 && player.replicanti.unl) replicantiTicks += player.options.updateRate

    if (current == Decimal.ln(Number.MAX_VALUE) && player.thisInfinityTime < 60000*30) giveAchievement("Is this safe?");
    if (player.replicanti.galaxies >= 10 && player.thisInfinityTime < 15000) giveAchievement("The swarm");

    if (player.replicanti.galaxybuyer && player.replicanti.amount.gte(Number.MAX_VALUE) && (!player.timestudy.studies.includes(131) || isAchEnabled("r138"))) {
        replicantiGalaxy();
    }
    PerformanceStats.end();
}

function replicantiMult() {
  let replmult = Decimal.pow(Decimal.log2(player.replicanti.amount), 2);
  if (player.timestudy.studies.includes(21)) replmult = replmult.plus(Decimal.pow(player.replicanti.amount, 0.032));
  if (player.timestudy.studies.includes(102)) replmult = replmult.times(Decimal.pow(5, player.replicanti.galaxies));
  replmult = replmult.pow(new Decimal(1).max(getAdjustedGlyphEffect("replicationpow")));
  return replmult;
}

const ReplicantiUpgrade = {
  chance: {
    get current() {
      return player.replicanti.chance;
    },
    set current(value) {
      player.replicanti.chance = value;
    },
    get cost() {
      return player.replicanti.chanceCost;
    },
    set cost(value) {
      player.replicanti.chanceCost = value;
    },
    get costIncrease() {
      return 1e15;
    },
    get next() {
      return nearestPercent(this.current + 0.01);
    },
    get cap() {
      return getMaxReplicantiChance();
    },
    get isCapped() {
      return nearestPercent(this.current) >= this.cap;
    },
    get isAutobuyerUnlocked() {
      return player.eternities >= 40;
    }
  },
  interval: {
    get current() {
      return player.replicanti.interval;
    },
    set current(value) {
      player.replicanti.interval = value;
    },
    get cost() {
      return player.replicanti.intervalCost;
    },
    set cost(value) {
      player.replicanti.intervalCost = value;
    },
    get costIncrease() {
      return 1e10;
    },
    get next() {
      return Math.max(this.current * 0.9, this.cap);
    },
    get cap() {
      return player.timestudy.studies.includes(22) ? 1 : 50;
    },
    get isCapped() {
      return this.current <= this.cap;
    },
    get isAutobuyerUnlocked() {
      return player.eternities >= 60;
    },
    applyModifiers(value) {
      return getReplicantiInterval(false, value);
    }
  },
  galaxies: {
    get current() {
      return player.replicanti.gal;
    },
    set current(value) {
      player.replicanti.gal = value;
    },
    get baseCost() {
      return player.replicanti.galCost;
    },
    get cost() {
      let cost = this.baseCost;
      if (player.timestudy.studies.includes(233)) {
        return cost.dividedBy(Replicanti.amount.pow(0.3))
      }
      return cost;
    },
    set cost(value) {
      player.replicanti.galCost = value;
    },
    get costIncrease() {
      const galaxies = this.current;
      let increase = player.currentEternityChall === "eterc6" ?
        Decimal.pow(1e2, galaxies).times(1e2) :
        Decimal.pow(1e5, galaxies).times(1e25);
      if (galaxies >= 100) {
        increase = increase.times(Decimal.pow(1e50, galaxies - 95))
      }
      return increase;
    },
    get next() {
      return this.current + 1;
    },
    get isCapped() {
      return false;
    },
    get isAutobuyerUnlocked() {
      return player.eternities >= 80;
    },
    get extra() {
      return player.timestudy.studies.includes(131) ? Math.floor(this.current / 2) : 0;
    }
  },
  isAvailable(upgrade) {
    return player.infinityPoints.gte(upgrade.cost) && !upgrade.isCapped && player.eterc8repl !== 0;
  },
  purchase(upgrade) {
    if (!this.isAvailable(upgrade)) return;
    player.infinityPoints = player.infinityPoints.minus(upgrade.cost);
    upgrade.cost = Decimal.times(upgrade.baseCost, upgrade.costIncrease);;
    upgrade.current = upgrade.next;
    if (player.currentEternityChall === "eterc8") player.eterc8repl--;
    GameUI.update();
  }
};

const Replicanti = {
  get areUnlocked() {
    return player.replicanti.unl;
  },
  unlock() {
    if (!player.infinityPoints.gte(1e140) || player.replicanti.unl) return;
    player.replicanti.unl = true;
    player.replicanti.amount = new Decimal(1);
    player.infinityPoints = player.infinityPoints.minus(1e140);
  },
  get amount() {
    return player.replicanti.amount;
  },
  get chance() {
    return ReplicantiUpgrade.chance.current;
  },
  galaxies: {
    get bought() {
      return player.replicanti.galaxies;
    },
    get extra() {
      let bonusGalaxies = 0;
      if (player.timestudy.studies.includes(225)) {
        bonusGalaxies += Math.floor(Replicanti.amount.e / 1000);
      }
      if (player.timestudy.studies.includes(226)) {
        bonusGalaxies += Math.floor(ReplicantiUpgrade.galaxies.current / 15);
      }
      return bonusGalaxies;
    },
    get total() {
      return this.bought + this.extra;
    },
    get max() {
      return ReplicantiUpgrade.galaxies.current + ReplicantiUpgrade.galaxies.extra;
    },
    get canBuyMore() {
      if (!Replicanti.amount.gte(Number.MAX_VALUE)) return false;
      return this.bought < this.max;
    },
    autobuyer: {
      get isUnlocked() {
        return player.replicanti.galaxybuyer !== undefined;
      },
      get isOn() {
        return player.replicanti.galaxybuyer;
      },
      set isOn(value) {
        player.replicanti.galaxybuyer = value;
      },
      toggle() {
        if (!this.isUnlocked) return;
        this.isOn = !this.isOn;
      },
      get isEnabled() {
        return !player.timestudy.studies.includes(131) || isAchEnabled("r138");
      }
    }
  },
};