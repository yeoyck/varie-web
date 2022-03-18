<template>
  <div class="layout-topbar" role="menu">
    <button class="p-link layout-menu-button layout-topbar-button" title="Menu (Ctrl+M)" @click="onMenuToggle">
      <i class="pi pi-bars"></i>
    </button>
    <a :href="'#'" class="layout-topbar-logo" aria-label="Home" exact role="menuitem" @click="onHomeClick">
      <img alt="Logo" src="/logo.png" class="hidden lg:inline-block" />
      <span>{{ $config.label.name }}</span>
    </a>

    <ul class="layout-topbar-menu2 flex origin-top">
      <li>
        <button class="p-link layout-topbar-button" title="Search (Ctrl+K)" @click="onSearchToggle">
          <i class="pi pi-search"></i>
          <span>Search</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button" title="Profile">
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </button>
      </li>
    </ul>
    <!-- <button
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true
      }"
      class="p-link layout-topbar-menu-button layout-topbar-button"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </button>
      </li>
    </ul> -->
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/stores/menu'
import { useSearchStore } from '@/stores/search'

const { $config } = useNuxtApp()
const emit = defineEmits(['menu-toggle'])

const menuStore = useMenuStore()
function onMenuToggle(event: Event) {
  emit('menu-toggle', event)
}
function onHomeClick() {
  const router = useRouter()
  if (menuStore.activeModule) {
    router.push({ name: menuStore.activeModule })
  } else {
    router.push({ path: '/' })
  }
}

const searchStore = useSearchStore()
function onSearchToggle() {
  searchStore.showSearch = !searchStore.showSearch
}

// Keyboard shortcut listener
const searchShortcut = (e: KeyboardEvent) => {
  if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()

    onSearchToggle()
  }
}
const menuShortcut = (e: KeyboardEvent) => {
  if (e.key === 'm' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()

    onMenuToggle(e)
  }
}

onMounted(() => {
  window.addEventListener('keydown', searchShortcut)
  window.addEventListener('keydown', menuShortcut)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', searchShortcut)
  window.removeEventListener('keydown', menuShortcut)
})
</script>

<style lang="scss" scoped>
.layout-topbar-menu2 {
  margin: 0 0 0 auto;
  padding: 0;
  list-style: none;
  display: flex;

  .layout-topbar-button {
    margin-left: 1rem;
  }
}
@media (max-width: 991px) {
  .layout-topbar-menu2 {
    order: 3;
  }
}
</style>
