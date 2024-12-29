<script>
import { Timespace } from "@/core/timespace/timespace";

export default {
  name: "BackToDoomButton",
  props: {
    isHeader: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      canBack: false,
      timeRemnants: 0,
    };
  },
  computed: {
    buttonClassObject() {
      return {
        "c-armageddon-button": true,
        "l-armageddon-button": !this.isHeader,
        "l-reality-button": this.isHeader,
        "l-armageddon-button--header": this.isHeader,
        "c-armageddon-button--unavailable": !this.canBack,
      };
    },
  },
  methods: {
    update() {
      this.canBack = Timespace.canBackToStart;
      this.timeRemnants = Timespace.timeRemnantsGain;
    },
    manualBackToStart() {
      if (!this.canBack) return;
      if (player.options.confirmations.backToStart) Modal.backToStart.show();
      else Timespace.backToStart();
    },
  },
};
</script>

<template>
  <button
    :class="buttonClassObject"
    @click="manualBackToStart"
  >
    <span v-if="isHeader">No miracle happened...<br></span>
    <span class="c-remnant-gain-display">
      Start over for
      <span class="c-remnant-gain">{{ timeRemnants }}</span>
      Time Remnants
    </span>
  </button>
</template>

<style scoped>
.c-armageddon-button {
  display: block;
  font-family: Typewriter;
  color: var(--color-text);
  background: var(--color-text-inverted);
  border: 0.1rem solid var(--color-pelle--base);
  border-radius: var(--var-border-radius, 0.5rem);
}

.s-base--metro .c-armageddon-button {
  box-shadow: 0.1rem 0.1rem 0.1rem 0 #9e9e9e;
}

.l-armageddon-button {
  width: 100%;
  padding: 1.5rem;
}

.l-armageddon-button--header {
  font-size: 1rem;
  font-weight: bold;
  padding: 0.4rem;
  margin-bottom: -1rem;
}

.c-armageddon-button:hover {
  box-shadow: 0.1rem 0.1rem 0.5rem var(--color-pelle--base);
  transition-duration: 0.12s;
  cursor: pointer;
}

.c-armageddon-button--unavailable {
  opacity: 0.5;
  cursor: default !important;
}

.c-remnant-gain {
  font-weight: bold;
  color: var(--color-pelle--base);
}

.c-remnant-gain-display {
  vertical-align: middle;
}
</style>