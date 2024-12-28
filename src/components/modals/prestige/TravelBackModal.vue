<script>
import { Timespace } from "../../../core/timespace/timespace";

import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "TravelBackModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      isBacked: false,
    };
  },
  computed: {
    topLabel() {
      return `You are about to perform a hard reset on your Doomed Reality`;
    },
    message() {
      return "";
    }
  },
  methods: {
    update() {
      this.isBacked = Timespace.isBacked;
    },
    handleYesClick() {
      Timespace.backToStart();
    },
  },
};
</script>

<template>
  <ModalWrapperChoice
    :option="undefined"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>
    <div
      v-if="!isBacked"
      class="c-modal-message__text"
    >
      Back to Doom will reset all progress in a Doomed Reality, including Remnants, Reality Shards, all Pelle Upgrades and all Strikes and Rifts.
      But as a reward, you will get Time Remnants, the sign of mastering time.
      <br>
      <br>
      Are you sure you want to do this?
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
