<script>
import { timelineLayout } from "./timeline-layout";

import TimelineConnection from "./TimelineConnection";
import TimelineUpgrade from "./TimelineUpgrade";

export default {
  name: "TimelineTab",
  components: {
    TimelineUpgrade,
    TimelineConnection,
  },
  data() {
    return {
      timeRemnants: new Decimal(0),
    };
  },
  computed: {
    layout() {
      return timelineLayout;
    }
  },
  methods: {
    update() {
      this.timeRemnants.copyFrom(Currency.timeRemnants);
    },
  },
};
</script>

<template>
  <div>
    <span class="c-tr-amount">
      You have {{ quantify("Time Remnant", timeRemnants, 2, 0) }}.
    </span>
    <br>
    <div class="c-timeline-container">
      <TimelineUpgrade
        v-for="tu in layout.timelineUpgrades"
        :key="tu.id"
        :tu-id="tu.id"
        :show-title="!tu.parent"
      />
      <TimelineConnection
        v-for="connection, id in layout.connections"
        :key="id"
        :connection="connection"
      />
    </div>
  </div>
</template>

<style scoped>
.c-timeline-container {
  position: relative;
  width: 0;
  display: inline-block;
  margin-top: 4rem;
  margin-bottom: 10rem;
}
</style>