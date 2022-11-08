<template>
  <svg :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})
const iconName = computed(() => `#icon-${props.iconClass}`)
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  vertical-align: -2px;
}
</style>
