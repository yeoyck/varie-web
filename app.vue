<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { useUserStore } from '@/stores/user'

// By right this should be done post auth
// For sample purpose, we will leave this here
useUserStore().postAuthInit()

// Listen to route (active module)
const route = useRoute()
const menuStore = useMenuStore()
watchEffect(() => {
  if (menuStore?.modules?.length > 0) {
    const moduleName = route?.name?.toString()?.split('-')
    if (moduleName && moduleName.length > 0 && menuStore.modules.find((x) => x.name === moduleName[0])) {
      menuStore.activeModule = moduleName[0]
    } else {
      menuStore.activeModule = null
    }
  }
})
</script>

<style lang="scss">
@import '~/styles/layout';
@import '~/styles/app';
</style>
