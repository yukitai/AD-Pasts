<script>
import { Currency } from "../../../core/currency";

import { timelineLayout } from "./timeline-layout";
import TimelineRow from "./TimelineRow";

export default {
  name: "TimelineTab",
  components: {
    TimelineRow,
  },
  data() {
    return {
      layout: timelineLayout.nodes,
    };
  },
  computed: {
    twistedTimeShardsText() {
      return `${quantify("Twisted Time Shard", this.twistedTimeShards, 2, 2, format)}`;
    },
    twistedTimeShards() {
      return Currency.twistedTimeShards.value;
    }
  },
  methods: {},
};
</script>

<template>
  <div class="center">
    <div>You have {{ twistedTimeShardsText }}.</div>
    <div>This would be the place we start again.</div>
    <div class="timeline-container">
      <ul class="timeline-list">
        <li
          v-for="row, id in layout"
          :key="id"
          class="timeline-item"
        >
          <TimelineRow
            :row="row"
            :row-id="id"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.center {
  text-align: center;
}
.timeline-container {
  display: inline-block;
  width: fit-content;
  padding-top: 2rem;
}
.timeline-list::before {
  content: "";
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--color-timespace);
  border-radius: 50%;
  left: -1rem;
  position: absolute;
  top: -1.5rem;
}
.timeline-list {
  position: relative;
  list-style: none;
  border-left: 0.5rem solid var(--color-timespace);
  margin-left: 7rem;
  padding-left: 3rem;
}
.timeline-item {
  position: relative;
  margin-bottom: 2.4rem;
  text-align: left;
}
.timeline-item::before {
  content: "";
  width: 1rem;
  height: 1rem;
  display: block;
  border-radius: 50%;
  background: var(--color-prestige--accent);
  border: 0.5rem solid var(--color-timespace);
  position: absolute;
  left: -4.26rem;
  top: 3.4rem;
}
</style>