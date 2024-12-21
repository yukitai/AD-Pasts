<script>
import TimelineNode from "./TimelineNode.vue";

export default {
  name: "TimelineRow",
  components: {
    TimelineNode,
  },
  props: {
    row: {
      type: Object,
      required: true
    },
    rowId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<template>
  <div>
    <TimelineNode
      v-for="node, id in row"
      :key="id"
      :node="node"
      :col="id"
      :row="rowId"
    />
  </div>
</template>

<style scoped>

</style>