<script>
import CostDisplay from "@/components/CostDisplay";
import { timelineLayout } from "./timeline-layout";
import { Currency } from "../../../core/currency";

export default {
  name: "TimelineRow",
  components: {
    CostDisplay,
  },
  props: {
    node: {
      type: Object,
      required: true
    },
    col: {
      type: Number,
      required: true,
    },
    row: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    config() {
      return this.node;
    },
    isBought() {
      return timelineLayout.isBought(this.row, this.col);
    },
    classObject() {
      return {
        "o-timeline-node-btn": true,
        "o-timeline-node-btn-active": this.isBought,
      };
    }
  },
  methods: {
    handleClick() {
      if (this.isBought) {
        return;
      }
      if (Currency.twistedTimeShards.lt(this.node.cost)) {
        return;
      }
      timelineLayout.setIsBought(this.row, this.col);
      Currency.twistedTimeShards.subtract(this.node.cost);
      if (this.onBuy) {
        this.node.onBuy();
      }
    },
  },
};
</script>

<template>
  <button
    :class="classObject"
    @click="handleClick"
  >
    <span>{{ node.name }}</span><br>
    <span>{{ node.description }}</span>
    <CostDisplay
      br
      :config="config"
      name="Twisted Time Shard"
    />
  </button>
</template>

<style scoped>
</style>