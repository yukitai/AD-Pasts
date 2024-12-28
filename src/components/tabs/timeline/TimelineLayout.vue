<script>
import TimelinePoint from "./TimelinePoint";
import { timelineLayout } from "./timeline-upgrades";

export default {
  name: "TimelineLayout",
  components: {
    TimelinePoint,
  },
  data() {
    return {
      points: [],
    };
  },
  computed: {},
  methods: {
    update() {
      this.points = timelineLayout.points;
    },
  },
};
</script>

<template>
  <div>
    <TimelinePoint
      v-for="point in points"
      :key="point.title"
      :point="point"
    />
  </div>
</template>

<style scoped>

</style>