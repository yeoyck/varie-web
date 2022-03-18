<template>
  <div class="layout-menu-container">
    <AppSubmenu
      v-show="!showModuleMenu"
      :items="filteredMenu"
      class="layout-menu"
      :root="true"
      @menuitem-click="onMenuItemClick"
      @action-click="onMenuActionClick"
      @keydown="onKeyDown"
    />
    <AppSubmenu
      v-show="showModuleMenu"
      :items="filteredModules"
      class="layout-menu"
      :root="true"
      @menuitem-click="onMenuItemClick"
      @action-click="onModuleActionClick"
      @keydown="onKeyDown"
    />
  </div>
</template>

<script lang="ts" setup>
import { IMenu, useMenuStore } from '@/stores/menu'
import { klona } from 'klona'

const store = useMenuStore()
const emit = defineEmits(['menuitem-click'])
const showModuleMenu = ref(false)

const filteredMenu = computed(() => {
  if (store.activeModule) {
    const moduleMenu = store.getFlattenMenu(store.activeModule)
    if (moduleMenu) {
      const cloneModuleMenu = [klona(moduleMenu)]
      store.filterMenu(cloneModuleMenu, true, true)

      if (cloneModuleMenu?.length > 0 && cloneModuleMenu[0].items) {
        // Add a separator to the module item
        cloneModuleMenu[0].items.unshift({ separator: true })

        // Add a module switcher button
        cloneModuleMenu[0].actionIcon = 'i-uim:apps'
      }

      return cloneModuleMenu
    }
  }
  // Full Menu (no module control)
  const cloneMenu = klona(store.menu)
  store.filterMenu(cloneMenu, true, true)
  return cloneMenu
})

const filteredModules = computed(() => {
  const modules = klona(store.modules)
  modules.forEach((module) => {
    module.items = []
  })
  return [{ title: 'Switch Apps', actionIcon: 'pi pi-times', items: [{ separator: true }, ...modules] }]
})

function onMenuItemClick(event: PointerEvent) {
  showModuleMenu.value = false
  emit('menuitem-click', event)
}
function onMenuActionClick(item: IMenu) {
  if (item?.module) {
    // Open Module Menu
    showModuleMenu.value = true
  }
}
function onModuleActionClick() {
  // Close Module Menu
  showModuleMenu.value = false
}
function onKeyDown(event: KeyboardEvent) {
  const nodeElement: HTMLElement = event.target as HTMLElement
  if (event.code === 'Enter' || event.code === 'Space') {
    if (nodeElement) nodeElement.click()
    event.preventDefault()
  }
}
</script>
