<template>
  <label :for="computedId" :class="{ 'p-error': props.validator?.$error }" v-html="computedLabel"></label>
  <div :class="computedGroupClass">
    <slot name="left-group"></slot>
    <InputText :id="computedId" v-bind="$attrs" :class="{ 'p-invalid': props.validator?.$error }" />
    <slot name="right-group"></slot>
  </div>
  <small v-if="computedError" class="p-error">{{ computedError }}</small>
</template>

<script lang="ts" setup>
import type { ChildStateLeafs } from '@vuelidate/core'
import { inputBase, IInputBase } from './inputShared'
import { InputTextProps } from 'primevue/inputtext'

// interface extends do not work for collecting input (but it does work for autocomplete)
// see inputShared.ts comment
interface IInputText extends IInputBase, InputTextProps {
  id?: string
  label?: string
  loading?: boolean
  validator?: ChildStateLeafs
}

const props = withDefaults(defineProps<IInputText>(), {
  // Cannot default id to generateUUID here (error)
})

const { computedId, computedLabel, computedError } = inputBase(props)

const slots = useSlots()

const computedGroupClass = computed(() => {
  // Grouping take precedence over left/right icon
  if (slots['left-group'] || slots['right-group']) {
    return ['p-inputgroup']
  }
  return undefined
})
</script>

<style lang="scss" scoped></style>
