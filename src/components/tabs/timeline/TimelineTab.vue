<script>
import { Timespace } from "@/core/timespace/timespace";
import TimelineLayout from "./TimelineLayout";

export default {
  name: "TimelineTab",
  components: {
    TimelineLayout,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    update() {
      // Snip
    },
    backToStart() {
      if (player.options.confirmations.backToStart) Modal.backToStart.show();
      else Timespace.backToStart();
    },
  },
};
</script>

<template>
  <div>
    <button @click="backToStart">
      Back to Doom
    </button>
    <div>
      <TimelineLayout />
    </div>
  </div>
</template>

<style scoped>

</style>