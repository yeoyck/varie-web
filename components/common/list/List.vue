<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// To mimick vuetify v-list (minimal - to our usecase)
const props = withDefaults(defineProps<{ dense?: boolean; subheader?: boolean }>(), {
  dense: false,
  subheader: false // Remove top padding
})
const className = computed(() => {
  return ['a-list', { 'a-list--dense': props.dense, 'a-list--subheader': props.subheader }]
})
</script>

<style lang="scss"></style>
