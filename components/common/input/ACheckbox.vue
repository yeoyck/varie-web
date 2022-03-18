<template>
  <div class="field-checkbox">
    <Checkbox :id="computedId" v-bind="$attrs" :class="props.validator?.$error ? 'p-invalid' : undefined" :binary="true" />
    <label :for="computedId" :class="{ 'p-error': props.validator?.$error }" v-html="computedLabel"></label>
  </div>
  <small v-if="computedError" class="p-error">{{ computedError }}</small>
</template>

<script lang="ts" setup>
import type { ChildStateLeafs } from '@vuelidate/core'
import { CheckboxProps } from 'primevue/checkbox'
import { IInputBase, inputBase } from './inputShared'

// interface extends do not work for collecting input (but it does work for autocomplete)
// see inputShared.ts comment
interface IInputNumber extends IInputBase, CheckboxProps {
  id?: string
  label?: string
  validator?: ChildStateLeafs
}

const props = withDefaults(defineProps<IInputNumber>(), {
  // Cannot default id to generateUUID here (error)
})

const { computedId, computedLabel, computedError } = inputBase(props)
</script>

<style lang="scss" scoped></style>
