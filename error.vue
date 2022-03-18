<template>
  <NuxtLayout name="error" title="Fatal Error" :description="description" :link="false">
    <div class="mt-5">
      <Button @click="clear">Back to Dashboard</Button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'

const props = defineProps<{
  error: Error
}>()

const description = props.error.message ?? props.error

const menuStore = useMenuStore()

function clear() {
  if (menuStore.activeModule) {
    clearError({ redirect: '/' + menuStore.activeModule })
  } else {
    clearError({ redirect: '/' })
  }
}
</script>

<style lang="scss" scoped></style>
