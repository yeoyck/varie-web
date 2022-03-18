// import { InputHTMLAttributes } from 'vue'
import { ChildStateLeafs, ErrorObject } from '@vuelidate/core'

// Currently props interface cannot be imported
// TODO We will use raw interface at the component until this is fixed
// https://vuejs.org/guide/typescript/composition-api.html#syntax-limitations
// https://github.com/vuejs/core/issues/4294
// https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md#type-only-propsemit-declarations

// Shared properties for common input
// export interface IInputBase extends InputHTMLAttributes
export interface IInputBase {
  id?: string
  label?: string
  validator?: ChildStateLeafs
}
export function inputBase(props: IInputBase) {
  const random = useRandom()
  const generatedId = random.generateString()
  const computedId = computed(() => {
    return props.id ?? generatedId
  })

  const computedLabel = computed(() => {
    if (props.label) {
      if (props.validator && props.validator.required) {
        return props.label + '*'
      }
      return props.label
    }
    return '&nbsp;'
  })

  const computedError = computed(() => {
    const errors = props.validator?.$errors as ErrorObject[]

    if (errors && errors.length > 0) {
      // Just return the 1st message for now
      if (props.label) {
        return errors[0].$message.toString().replace('Value', props.label)
      }
      return errors[0].$message
    }

    return undefined
  })

  return { computedId, computedLabel, computedError }
}
