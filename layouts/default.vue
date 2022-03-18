<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopbar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <slot name="breadcrumb">
          <AppBreadcrumb v-if="props.breadcrumb"></AppBreadcrumb>
        </slot>
        <slot />
      </div>
    </div>

    <transition name="layout-mask">
      <div v-if="mobileMenuActive" class="layout-mask p-component-overlay"></div>
    </transition>
    <AppSearch />
    <ClientOnly>
      <Toast />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { IMenu } from '@/stores/menu'

interface defaultProp {
  breadcrumb?: boolean
}
const props = withDefaults(defineProps<defaultProp>(), {
  breadcrumb: true
})

const layoutMode = ref('static')
const menuClick = ref(false)
const staticMenuInactive = ref(false)
const overlayMenuActive = ref(false)
const mobileMenuActive = ref(false)

const containerClass = computed(() => {
  return [
    'layout-wrapper',
    {
      'layout-overlay': layoutMode.value === 'overlay',
      'layout-static': layoutMode.value === 'static',
      'layout-static-sidebar-inactive': staticMenuInactive.value && layoutMode.value === 'static',
      'layout-overlay-sidebar-active': overlayMenuActive.value && layoutMode.value === 'overlay',
      'layout-mobile-sidebar-active': mobileMenuActive.value
    }
  ]
})

onBeforeUpdate(() => {
  if (mobileMenuActive.value) addClass(document.body, 'body-overflow-hidden')
  else removeClass(document.body, 'body-overflow-hidden')
})

function onWrapperClick() {
  if (!menuClick.value) {
    overlayMenuActive.value = false
    mobileMenuActive.value = false
  }
  menuClick.value = false
}
function onMenuToggle() {
  menuClick.value = true
  if (isDesktop()) {
    if (layoutMode.value === 'overlay') {
      if (mobileMenuActive.value === true) {
        overlayMenuActive.value = true
      }

      overlayMenuActive.value = !overlayMenuActive.value
      mobileMenuActive.value = false
    } else if (layoutMode.value === 'static') {
      staticMenuInactive.value = !staticMenuInactive.value
    }
  } else {
    mobileMenuActive.value = !mobileMenuActive.value
  }
}
function onSidebarClick() {
  menuClick.value = true
}
function onMenuItemClick(event: { originalEvent: PointerEvent; item: IMenu }) {
  if (event.item && !event.item.items) {
    overlayMenuActive.value = false
    mobileMenuActive.value = false
  }
}
function addClass(element: HTMLElement, className: string) {
  if (element.classList) element.classList.add(className)
  else element.className += ' ' + className
}
function removeClass(element: HTMLElement, className: string) {
  if (element.classList) element.classList.remove(className)
  else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
}
function isDesktop() {
  return window.innerWidth >= 992
}
</script>
