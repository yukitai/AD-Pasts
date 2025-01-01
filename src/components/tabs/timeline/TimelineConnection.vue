<script>
import { TU } from "@/core/timespace/timeline-upgrade";

import { timelineLayoutGap } from "./timeline-layout";

export default {
  name: "TimelineConnection",
  props: {
    connection: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    connectionStyle() {
      const tu1 = TU(this.connection[0]),
            tu2 = TU(this.connection[1]);

      const [x0, y0] = tu1.position;
      const [x1, y1] = tu2.position;

      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      const length = Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2)) * timelineLayoutGap;
      const rad = Math.atan2(y1 - y0, x1 - x0);

      return {
        left: `${cx * timelineLayoutGap}rem`,
        top: `${cy * timelineLayoutGap}rem`,
        width: `${length}rem`,
        transform: `translateX(-${length / 2}rem) rotate(${rad}rad)`,
        "background-color": this.active ? "var(--color-text)" : "var(--color-pelle--base)",
      };
    }
  },
  methods: {
    update() {
      const tu1 = TU(this.connection[0]),
            tu2 = TU(this.connection[1]);

      this.active = tu1.isActive && tu2.isActive;
    },
  },
};
</script>

<template>
  <div
    class="o-timeline-connection"
    :style="connectionStyle"
  />
</template>

<style>
.o-timeline-connection {
  position: absolute;
  height: 2px;
  z-index: 0;
}
</style>