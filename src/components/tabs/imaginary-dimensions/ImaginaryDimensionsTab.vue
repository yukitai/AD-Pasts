<script>
import ClassicImaginaryDimensionsTab from "./ClassicImaginaryDimensionsTab";
import ModernImaginaryDimensionsTab from "./ModernImaginaryDimensionsTab";

export default {
  name: "ImaginaryDimensionsTab",
  components: {
    ClassicImaginaryDimensionsTab,
    ModernImaginaryDimensionsTab
  },
  computed: {
    activeComponent() {
      return this.$viewModel.newUI
        ? "ModernImaginaryDimensionsTab"
        : "ClassicImaginaryDimensionsTab";
    }
  }
};
</script>

<template>
  <component :is="activeComponent" />
</template>
