<script>
import { TimelinePoint } from "./timeline-upgrades";
import TimelineUpgrade from "./TimelineUpgrade";

export default {
  name: "TimelinePoint",
  components: {
    TimelineUpgrade,
  },
  props: {
    point: {
      type: TimelinePoint,
      required: true,
    }
  },
  data() {
    return {
      description: "",
      active: true,
    };
  },
  computed: {
    disableClass() {
      return {
        "o-timeline-point-btn": true,
        "o-timeline-point-disabled": !this.active,
      };
    }
  },
  methods: {
    update() {
      this.description = this.point.getDescription();
      this.active = this.point.isActive;
    },
  },
};
</script>

<template>
  <div class="c-timeline-point-container">
    <div class="c-timeline-point">
      <button :class="disableClass">
        {{ point.title }}<br>
        {{ description }}
      </button>
      <TimelineUpgrade
        v-for="upgradeId in point.chilren"
        :key="upgradeId"
        :upgrade-id="upgradeId"
      />
    </div>
  </div>
</template>

<style scoped>
.c-timeline-point-container {
  margin-bottom: 2rem;
}

.c-timeline-point {
  position: relative;
  display: inline-block;
}

.o-timeline-point-btn {
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

.o-timeline-point-disabled {
  background-color: red;
}
</style>