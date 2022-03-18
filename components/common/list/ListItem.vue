<template>
  <div v-if="attrs.onClick" v-ripple :class="className">
    <slot></slot>
  </div>
  <div v-else :class="className">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ disabled?: boolean }>(), {
  disabled: false
})
const attrs = useAttrs()

const className = computed(() => {
  return ['a-list-item', { 'a-list-item--link': attrs.onClick, 'a-list-item--disabled': props.disabled, 'p-ripple': attrs.onClick }]
})
</script>

<style lang="scss" scoped></style>
