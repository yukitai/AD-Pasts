<script>
import { DC } from "@/core/constants";
import { TU } from "../../../core/timespace/timeline-upgrade";

import { timelineLayoutGap } from "./timeline-layout";

export default {
  name: "TimelineUpgrade",
  props: {
    tuId: {
      type: Number,
      required: true,
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tuTitle: "",
      tuDesc: "",
      tuReward: "",
      position: [0, 0],
      cost: DC.D0,
      maxBuyCount: 0,
      buyCount: 0,
      canBuy: false,
      isActive: false,
      showInfo: false,
    };
  },
  computed: {
    transitionStyle() {
      return {
        left: `${this.position[0] * timelineLayoutGap}rem`,
        top: `${this.position[1] * timelineLayoutGap}rem`,
        "--fill-percent": `${this.fillPercent * 100}%`,
      };
    },
    fillPercent() {
      if (this.maxBuyCount === 0) return Number(this.isActive);
      return this.buyCount / this.maxBuyCount;
    },
    upgradeClass() {
      return {
        "c-tu-container": true,
        "c-tu-full": this.maxBuyCount === this.buyCount && this.isActive,
      };
    },
    descClass() {
      return {
        "o-tu-desc-active": this.isActive,
        "o-tu-desc": !this.isActive,
      };
    },
  },
  methods: {
    update() {
      const tu = TU(this.tuId);
      this.tuTitle = tu.name;
      this.tuDesc = tu.getDescription();
      this.tuReward = tu.getReward();
      this.position = tu.position;
      const cost = tu.getCost();
      if (cost !== null) {
        this.cost = cost;
      }
      this.maxBuyCount = tu.maxBuyCount;
      this.buyCount = tu.buyCount;
      this.canBuy = tu.canBuy;
      this.isActive = tu.isActive;
    },
    mouseenter() {
      this.showInfo = true;
    },
    mouseleave() {
      this.showInfo = false;
    },
    handleClick() {
      TU(this.tuId).tryBuy();
    },
  },
};
</script>

<template>
  <div>
    <div
      :class="upgradeClass"
      :style="transitionStyle"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
      @click="handleClick"
    >
      <span
        v-if="showTitle"
        class="o-title-show"
      >
        {{ tuTitle }}
      </span>
    </div>
    <div
      v-show="showInfo"
      class="c-tu-info"
      :style="transitionStyle"
    >
      {{ tuTitle }} (TL{{ tuId }})
      <span
        v-if="tuDesc"
        :class="descClass"
      ><br>{{ tuDesc }}</span>
      <span v-if="tuReward"><br>{{ tuReward }}</span>
      <span v-if="maxBuyCount > 0">
        <br>You've bought {{ buyCount }}/{{ maxBuyCount }} times
        <br>Cost: {{ quantify("Time Remnant", cost, 2, 0) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.c-tu-container {
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid hsl(from var(--color-pelle--base) h s 30);
  transform: translate(-1rem, -1rem);
  background:
    linear-gradient(90deg, var(--color-pelle--base) var(--fill-percent), var(--color-base) var(--fill-percent));
  --fill-percent: 100%;
  z-index: 1;
  --color-tu-line: var(--color-pelle--base);
  color: ver(--color-tu-line);
}

.c-tu-info {
  position: absolute;
  display: block;
  width: max-content;
  height: auto;
  background-color: rgb(from var(--color-base) r g b / 90%);
  z-index: 10;
  transform: translateX(2rem);
  padding: .5rem 1rem;
  border-radius: var(--var-border-radius, 0.5rem);
  border: 2px solid var(--color-text-light-blue-gray);
  backdrop-filter: blur(5px);
}

.c-tu-full {
  border-color: var(--color-text);
  --color-tu-line: var(--color-text);
}

.o-tu-desc {
  color: var(--color-pelle--base);
}

.o-tu-desc-active {
  color: var(--color-pelle--secondary);
}

.c-tu-container:hover {
  cursor: pointer;
  border-color: var(--color-text);
  background: var(--color-pelle--base);
}

.o-title-show {
  display: block;
  transform: translate(5.5rem, -2.2rem);
  width: max-content;
  font-weight: bold;
}

.o-title-show::before {
  content: "";
  width: 2rem;
  height: 2px;
  background: var(--color-tu-line);
  display: block;
  transform: translate(-4.2rem, 1.6rem) rotate(-45deg);
}

.o-title-show::after {
  content: "";
  width: 2rem;
  height: 2px;
  background-color: var(--color-tu-line);
  display: block;
  transform: translate(-2.5rem, -0.9rem);
}
</style>