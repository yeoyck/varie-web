<template>
  <Breadcrumb v-if="showBreadcrumb" :home="home" :model="items" class="app-breadcrumb hidden lg:block"> </Breadcrumb>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { MenuItem } from 'primevue/menuitem'
const route = useRoute()
const store = useMenuStore()
const useModules = store.modules.length > 0

const home = ref<MenuItem | undefined>(undefined)
const items = ref<MenuItem[]>([])

// Only show if there is a "home/base" and at least a child item
const showBreadcrumb = computed(() => {
  if (home.value && items.value.length > 0) {
    return true
  }
  return false
})
watchEffect(() => {
  const findMenu = store.getFlattenMenu(route?.name?.toString())
  if (findMenu) {
    const fullBreadcrumb = store.getBreadcrumb(findMenu.key)
    if (fullBreadcrumb && fullBreadcrumb.length > 0) {
      if (useModules) {
        // "home/base" should be the module instead of index/dashboard
        fullBreadcrumb.shift()
        if (fullBreadcrumb.length > 0) {
          home.value = {
            icon: fullBreadcrumb[0].icon,
            label: fullBreadcrumb[0].title,
            to: { name: fullBreadcrumb[0].name }
          }
          fullBreadcrumb.shift()
        } else {
          home.value = undefined
        }
      } else {
        home.value = {
          icon: fullBreadcrumb[0].icon,
          label: fullBreadcrumb[0].title,
          to: { name: fullBreadcrumb[0].name }
        }
        fullBreadcrumb.shift()
      }
      items.value = fullBreadcrumb.map((x) => {
        return {
          label: x.title,
          to: { name: x.name }
        }
      })

      // Disable the last item
      if (items.value.length > 0) {
        items.value[items.value.length - 1].disabled = true
      }
    } else {
      home.value = undefined
      items.value = []
    }
  } else {
    home.value = undefined
    items.value = []
  }
})
</script>

<style lang="scss">
.app-breadcrumb {
  &.p-breadcrumb {
    padding: 0 0 1rem;
    border: none;
    background: transparent;
  }

  .p-menuitem-icon {
    vertical-align: middle;
    margin-right: 5px;
  }

  .p-menuitem-text {
    vertical-align: middle;
  }
}
</style>
