<template>
  <ul v-if="props.items" role="menu">
    <template v-for="(item, i) of props.items">
      <li
        v-if="visible(item)"
        :key="item.title || i"
        :class="[{ 'layout-menuitem-category': props.root, 'active-menuitem': activeIndex === i && !item.name && !item.disabled }]"
        role="none"
      >
        <template v-if="props.root">
          <div class="submenu-item">
            <NuxtLink
              v-if="item.name"
              v-ripple
              :to="{ name: item.name }"
              :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
              :style="{ ...item.style }"
              :target="item.target"
              :aria-label="item.title"
              exact
              role="menuitem"
              @click="onMenuItemClick($event, item, i)"
            >
              <i v-if="item.icon" :class="item.icon" :style="item.iconColor ? { color: `var(--${item.iconColor})` } : undefined"></i>
              <i v-else class="pi pi-file" :style="item.iconColor ? { color: `var(--${item.iconColor})` } : undefined"></i>

              <span>{{ item.title }}</span>
              <Badge v-if="item.badge" :value="item.badge"></Badge>
            </NuxtLink>
            <div v-else class="layout-menuitem-root-text" :aria-label="item.title">{{ item.title }}</div>
            <Button
              v-if="item.actionIcon"
              :icon="item.actionIcon"
              class="action-button p-button-rounded p-button-text"
              @click="onActionClick(item)"
            />
          </div>
          <AppSubmenu :items="item.items" @menuitem-click="emit('menuitem-click', $event)" @action-click="onActionClick"></AppSubmenu>
        </template>
        <template v-else>
          <div v-if="item.separator" class="submenu-separator"></div>
          <div v-else-if="item.items && item.items.length > 0" class="submenu-item">
            <a
              v-ripple
              :href="'#'"
              :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
              :style="{ ...item.style }"
              :target="item.target"
              :aria-label="item.title"
              exact
              role="menuitem"
              @click="onMenuItemClick($event, item, i)"
            >
              <i v-if="item.icon" :class="item.icon" :style="item.iconColor ? { color: `var(--${item.iconColor})` } : undefined"></i>
              <i v-else class="pi pi-folder" :style="item.iconColor ? { color: `var(--${item.iconColor})` } : undefined"></i>
              <span>{{ item.title }}</span>
              <i class="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
              <Badge v-if="item.badge" :value="item.badge"></Badge>
            </a>
            <Button
              v-if="item.actionIcon"
              :icon="item.actionIcon"
              class="action-button p-button-rounded p-button-text"
              @click="onActionClick(item)"
            />
          </div>
          <div v-else class="submenu-item">
            <NuxtLink
              v-ripple
              :to="{ name: item.name }"
              :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
              :style="{ ...item.style }"
              :target="item.target"
              :aria-label="item.title"
              exact
              role="menuitem"
              @click="onMenuItemClick($event, item, i)"
            >
              <i v-if="item.icon" :class="item.icon" :style="item.iconColor ? { color: `var(--${item.iconColor})` } : undefined"></i>
              <i v-else class="pi pi-file" :style="item.iconColor ? { color: `var(--${item.iconColor})` } : undefined"></i>
              <span>{{ item.title }}</span>
              <Badge v-if="item.badge" :value="item.badge"></Badge>
            </NuxtLink>
            <Button
              v-if="item.actionIcon"
              :icon="item.actionIcon"
              class="action-button p-button-rounded p-button-text"
              @click="onActionClick(item)"
            />
          </div>
          <transition name="layout-submenu-wrapper">
            <AppSubmenu
              v-show="activeIndex === i"
              :items="item.items"
              @menuitem-click="$emit('menuitem-click', $event)"
              @action-click="onActionClick"
            ></AppSubmenu>
          </transition>
        </template>
      </li>
    </template>
  </ul>
</template>
<script lang="ts" setup>
import { IMenu } from '@/stores/menu'
const props = withDefaults(defineProps<{ items?: IMenu[] | null | undefined; root?: boolean }>(), {
  root: false,
  items: undefined
})
const emit = defineEmits(['menuitem-click', 'action-click'])
const activeIndex = ref<number | null>(null)
function visible(item: IMenu) {
  return typeof item.visible === 'function' ? item.visible(item) : item.visible !== false
}
function onMenuItemClick(event: Event, item: IMenu, index: number) {
  if (item.disabled) {
    event.preventDefault()
    return
  }

  if (!item.name && !item.url) {
    event.preventDefault()
  }

  //execute command
  if (item.command) {
    item.command({ originalEvent: event, item: item })
  }

  activeIndex.value = index === activeIndex.value ? null : index

  emit('menuitem-click', {
    originalEvent: event,
    item: item
  })
}
function onActionClick(item: IMenu) {
  emit('action-click', item)
}
</script>

<style lang="scss" scoped>
.submenu-item {
  display: flex;
  align-items: center;

  .layout-menuitem-root-text {
    margin-bottom: 0;
  }

  a,
  div {
    flex-grow: 1;
  }

  .action-button {
    :deep(.p-button-icon) {
      width: 1.5em;
      height: 1.5em;
    }

    // If its a pi icon, use normal width/height
    :deep(.pi) {
      width: 1em;
      height: 1em;
    }
  }
}

.submenu-separator {
  border-top: 1px solid #dee2e6;
  margin: 0.25rem 0;
}
</style>
