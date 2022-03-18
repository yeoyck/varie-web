<template>
  <div>
    <ul class="m-0 p-0">
      <li v-for="i of props.line" :key="i" class="mb-3">
        <div class="flex">
          <Skeleton v-if="props.avatar" shape="circle" size="4rem" class="mr-2"></Skeleton>
          <div style="flex: 1">
            <Skeleton width="100%" class="mb-2"></Skeleton>
            <Skeleton width="75%"></Skeleton>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ avatar?: boolean; line?: number }>(), {
  avatar: true,
  line: 1
})
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
