<template>
  <div>
    <div>
      {{ config.build.API_URL }}
    </div>
    <div>
      {{ config.label.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<style lang="scss" scoped></style>
