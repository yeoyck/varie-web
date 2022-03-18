<template>
  <label :for="computedId" :class="{ 'p-error': props.validator?.$error }" v-html="computedLabel"></label>
  <Textarea :id="computedId" v-bind="$attrs" :class="{ 'p-invalid': props.validator?.$error }" />
  <small v-if="computedError" class="p-error">{{ computedError }}</small>
</template>

<script lang="ts" setup>
import type { ChildStateLeafs } from '@vuelidate/core'
import { inputBase, IInputBase } from './inputShared'
import { TextareaProps } from 'primevue/textarea'

// interface extends do not work for collecting input (but it does work for autocomplete)
// see inputShared.ts comment
interface IInputText extends IInputBase, TextareaProps {
  id?: string
  label?: string
  validator?: ChildStateLeafs
}

const props = withDefaults(defineProps<IInputText>(), {
  // Cannot default id to generateUUID here (error)
})

const { computedId, computedLabel, computedError } = inputBase(props)
</script>

<style lang="scss" scoped></style>
