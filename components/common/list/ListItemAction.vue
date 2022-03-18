<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const slots = useSlots()
let hasMultipleChildren = false
if (slots.default && slots.default().length > 1) {
  hasMultipleChildren = true
}
const className = computed(() => {
  return ['a-list-item-action', { 'a-list-item-action--stack': hasMultipleChildren }]
})
</script>

<style lang="scss" scoped></style>
