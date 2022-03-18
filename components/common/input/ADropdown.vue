<template>
  <label :for="computedId" :class="{ 'p-error': props.validator?.$error }" v-html="computedLabel"></label>
  <div :class="computedGroupClass">
    <slot name="left-group"></slot>
    <Dropdown :id="computedId" v-bind="$attrs" :class="{ 'p-invalid': props.validator?.$error }" />
    <slot name="right-group"></slot>
  </div>
  <small v-if="computedError" class="p-error">{{ computedError }}</small>
</template>

<script lang="ts" setup>
import type { ChildStateLeafs } from '@vuelidate/core'
import { DropdownProps } from 'primevue/dropdown'
import { IInputBase, inputBase } from './inputShared'

// interface extends do not work for collecting input (but it does work for autocomplete)
// see inputShared.ts comment
interface IDropdown extends IInputBase, DropdownProps {
  id?: string
  label?: string
  validator?: ChildStateLeafs
}

const props = withDefaults(defineProps<IDropdown>(), {
  // Cannot default id to generateUUID here (error)
})

const slots = useSlots()

const computedGroupClass = computed(() => {
  // Grouping take precedence over left/right icon
  if (slots['left-group'] || slots['right-group']) {
    return ['p-inputgroup']
  }
  return undefined
})

const { computedId, computedLabel, computedError } = inputBase(props)
</script>

<style lang="scss" scoped></style>
