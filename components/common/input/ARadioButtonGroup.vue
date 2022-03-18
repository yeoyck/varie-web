<template>
  <label :for="computedId" :class="{ 'p-error': props.validator?.$error }" v-html="computedLabel"></label>
  <!-- <RadioButton :id="computedId" v-bind="$attrs" :class="{ 'p-invalid': props.validator?.$error }" /> -->
  <div :class="[{ 'formgroup-inline': props.inline }]" style="margin-top: 0.5rem">
    <div v-for="option of options" :key="option[props.optionValue] + ''" class="field-radiobutton">
      <RadioButton
        :id="option[props.optionValue] + ''"
        v-bind="$attrs"
        :name="computedId"
        :value="option[props.optionValue]"
        :class="{ 'p-invalid': props.validator?.$error }"
      />
      <label :for="option[props.optionValue] + ''">{{ option[props.optionLabel] }}</label>
    </div>
  </div>
  <small v-if="computedError" class="p-error">{{ computedError }}</small>
</template>

<script lang="ts" setup>
import type { ChildStateLeafs } from '@vuelidate/core'
import { RadioButtonProps } from 'primevue/radiobutton'
import { IInputBase, inputBase } from './inputShared'

// interface extends do not work for collecting input (but it does work for autocomplete)
// see inputShared.ts comment
interface IRadioButtonGroup extends IInputBase, RadioButtonProps {
  id?: string
  label?: string
  validator?: ChildStateLeafs
  options: Record<string, string>[]
  optionLabel?: string
  optionValue?: string
  inline?: boolean // Horizontal
}

const props = withDefaults(defineProps<IRadioButtonGroup>(), {
  // Cannot default id to generateUUID here (error)
  optionLabel: 'label',
  optionValue: 'value',
  inline: true
})

const { computedId, computedLabel, computedError } = inputBase(props)
</script>

<style lang="scss" scoped></style>
