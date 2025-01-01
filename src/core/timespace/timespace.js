import { Currency } from "../currency";
import { DC } from "../constants";
import { Pelle } from "../globals";

import { TU } from "./timeline-upgrade";

export const Timespace = {
  get isBacked() {
    return player.extend.timespace.backCount > 0;
  },

  get isUnlocked() {
    return player.extend.timespace.unlock;
  },

  get isImaginaryDimensionsUnlock() {
    return TU(1).isActive;
  },

  get isContinuumRegain() {
    return TU(11).isActive;
  },

  get canBackToStart() {
    return this.timeRemnantsGain.gte(1);
  },

  get TRdivide() {
    return 4000;
  },

  get TRpower() {
    return 3;
  },

  get timeRemnantsGain() {
    if (!PelleRifts.recursion.milestones[2].canBeApplied) return DC.D0;
    const ep = Pelle.cel.records.totalEternityPoints.plus(1).log10();
    const gain = Decimal.pow(ep / this.TRdivide, this.TRpower);
    return Decimal.floor(gain);
  },

  backToStart() {
    if (!Glyphs.unequipAll()) {
      Modal.hideAll();
      Modal.message.show(`Travel back to a new Doomed Reality will unequip your Glyphs. Some of your
        Glyphs could not be unequipped due to lack of inventory space.`, 1);
      return;
    }

    Currency.timeRemnants.add(this.timeRemnantsGain);

    respecTimeStudies(true);

    Currency.infinityPoints.reset();
    player.IPMultPurchases = 0;
    Autobuyer.bigCrunch.mode = AUTO_CRUNCH_MODE.AMOUNT;
    disChargeAll();
    clearCelestialRuns();

    player.auto.antimatterDims.isActive = true;

    player.buyUntil10 = true;
    player.records.realTimeDoomed = 0;
    for (const res of AlchemyResources.all) res.amount = 0;
    AutomatorBackend.stop();

    const tabsToIgnore = ["statistics", "achievements", "reality", "celestials"];
    const ignoredIDs = GameDatabase.tabs.filter(t => tabsToIgnore.includes(t.key)).map(t => t.id);
    for (let tabIndex = 0; tabIndex < GameDatabase.tabs.length; tabIndex++) {
      player.options.hiddenSubtabBits[tabIndex] &= ignoredIDs.includes(tabIndex) ? -1 : 0;
    }

    this.resetPelleState();
    Pelle.armageddon(false);

    player.extend.timespace.backCount = (player.extend.timespace.backCount ?? 0) + 1;
  },

  resetPelleState() {
    player.celestials.pelle.upgrades = new Set();

    player.celestials.pelle.rebuyables = {
      antimatterDimensionMult: 0,
      timeSpeedMult: 0,
      glyphLevels: 0,
      infConversion: 0,
      galaxyPower: 0,
      galaxyGeneratorAdditive: 0,
      galaxyGeneratorMultiplicative: 0,
      galaxyGeneratorAntimatterMult: 0,
      galaxyGeneratorIPMult: 0,
      galaxyGeneratorEPMult: 0,
    };
    player.celestials.pelle.rifts = {
      vacuum: {
        fill: DC.D0,
        active: false,
        reducedTo: 1
      },
      decay: {
        fill: DC.D0,
        active: false,
        percentageSpent: 0,
        reducedTo: 1
      },
      chaos: {
        fill: 0,
        active: false,
        reducedTo: 1
      },
      recursion: {
        fill: DC.D0,
        active: false,
        reducedTo: 1
      },
      paradox: {
        fill: DC.D0,
        active: false,
        reducedTo: 1
      }
    };
    player.celestials.pelle.progressBits = 0;
    player.celestials.pelle.galaxyGenerator = {
      unlocked: false,
      spentGalaxies: 0,
      generatedGalaxies: 0,
      phase: 0,
      sacrificeActive: false
    };

    player.celestials.pelle.collapsed = {
      upgrades: false,
      rifts: false,
      galaxies: false
    };

    player.celestials.pelle.records = {
      totalAntimatter: DC.D0,
      totalInfinityPoints: DC.D0,
      totalEternityPoints: DC.D0,
    };

    Currency.remnants.reset();
    Currency.realityShards.reset();
  },
};

window.Timespace = Timespace;