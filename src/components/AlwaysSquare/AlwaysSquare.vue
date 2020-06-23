<template>
  <div
    class="always-square"
    :style="`width: ${auto}%;flex-basis:${auto}%; padding-bottom: ${auto}%;`"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AlwaysSquare',
  props: {
    auto: {
      type: [String, Number],
      default: function() {
        return 100
      }
    }
  }
}
</script>

<style scoped>
.always-square > * {
  height: calc(100%);
  width: calc(100%);
}
</style>
