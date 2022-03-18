<template>
  <ClientOnly>
    <label :for="computedId" :class="{ 'p-error': props.validator?.$error }" v-html="computedLabel"></label>
    <Calendar
      :id="computedId"
      :date-format="dateFormat"
      :touch-u-i="computedTouch"
      :manual-input="!computedTouch"
      v-bind="$attrs"
      :class="{ 'p-invalid': props.validator?.$error }"
    />
    <small v-if="computedError" class="p-error">{{ computedError }}</small>
  </ClientOnly>
</template>

<script lang="ts" setup>
import type { ChildStateLeafs } from '@vuelidate/core'
import { inputBase, IInputBase } from './inputShared'
import { CalendarProps } from 'primevue/calendar'

// interface extends do not work for collecting input (but it does work for autocomplete)
// see inputShared.ts comment
interface IInputText extends IInputBase, CalendarProps {
  id?: string
  label?: string
  validator?: ChildStateLeafs
}

const props = withDefaults(defineProps<IInputText>(), {
  // Cannot default id to generateUUID here (error)
})

const { computedId, computedLabel, computedError } = inputBase(props)

const dateFormat = useDate().primeDateFormat
const breakpoint = useUI().breakpoint

const computedTouch = computed(() => {
  // Since its a function, it will track the variable that changes
  // return breakpoint.isSmaller('sm')
  // Workard
  return breakpoint.md.value === false
})
</script>

<style lang="scss" scoped></style>
