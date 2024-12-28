<script>
import { DC } from "../../../core/constants";

import { timelineLayout } from "./timeline-upgrades";

export default {
  name: "TimelineUpgrade",
  components: {},
  props: {
    upgradeId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cost: DC.D0,
      title: "",
      description: "",
      position: [0, 0],
    };
  },
  computed: {
    formatCost() {
      return `${format(this.cost)} Time Remnants`;
    },
    positionStyle() {
      const [x, y] = this.position;
      return {
        left: `${20 * x}rem`,
        top: `${12 * y}rem`,
      };
    },
  },
  methods: {
    update() {
      const upgrade = timelineLayout.upgrades[this.upgradeId];
      this.cost = upgrade.getCost();
      this.title = upgrade.title;
      this.description = upgrade.description;
      this.position = [...upgrade.position];
    },
  },
};
</script>

<template>
  <button
    class="o-timeline-upgrade-btn"
    :style="positionStyle"
  >
    {{ title }}<br>
    {{ description }}<br>
    Cost: {{ formatCost }}
  </button>
</template>

<style scoped>
.o-timeline-upgrade-btn {
  position: absolute;
  width: 18rem;
  height: 10rem;
  font-family: Typewriter, serif;
  font-size: 1rem;
  font-weight: bold;
  background-color: gray;
  border: 0.1rem solid;
  border-radius: var(--var-border-radius, 0.4rem);
  transition-duration: 0.2s;
}
</style>