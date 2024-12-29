<script>
export default {
  name: "TimelineTab",
  components: {},
  data() {
    return {
      timeRemnants: new Decimal(0),
    };
  },
  computed: {
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
  </div>
</template>

<style scoped>

</style>