<template>
  <div class="grid">
    <div class="col-12 xl:col-8">
      <form @submit.prevent="toast.validateForm(validate1, doSubmit)">
        <Card>
          <template #title> Forms </template>
          <template #subtitle> Form components (with wrapper for ease of dev and consistency), layout, validation (with vuelidate) etc </template>
          <template #content>
            <div class="p-fluid formgrid grid">
              <div class="field col-12 lg:col-6">
                <AInputText id="firstName" v-model="form1.firstName" label="First Name" :validator="validate1.firstName">
                  <template #left-group>
                    <span class="p-inputgroup-addon">
                      <i class="pi pi-user"></i>
                    </span>
                  </template>
                  <template #right-group>
                    <Button icon="pi pi-search" class="p-button-warning" @click="doTest" />
                  </template>
                </AInputText>
              </div>
              <div class="field col-12 lg:col-6">
                <AInputText id="lastName" v-model="form1.lastName" label="Last Name" :validator="validate1.lastName"></AInputText>
              </div>
              <div class="field col-12 lg:col-6">
                <AInputNumber
                  v-model="form1.salary"
                  label="Salary"
                  :validator="validate1.salary"
                  mode="currency"
                  currency="SGD"
                  :min-fraction-digits="2"
                  :max-fraction-digits="2"
                >
                  <template #left-group>
                    <span class="p-inputgroup-addon">
                      <i class="pi pi-dollar"></i>
                    </span>
                  </template>
                </AInputNumber>
              </div>
              <div class="field col-12 lg:col-6">
                <AInputNumber v-model="form1.noChild" label="No Child" :validator="validate1.noChild" :use-grouping="false"> </AInputNumber>
              </div>
              <div class="field col-12 lg:col-6">
                <ADropdown
                  v-model="form1.gender"
                  label="Gender"
                  :validator="validate1.gender"
                  :options="gender"
                  option-label="label"
                  option-value="value"
                  show-clear
                  filter
                >
                </ADropdown>
              </div>
              <div class="field col-12 lg:col-6">
                <ARadioButtonGroup
                  v-model="form1.nationality"
                  label="Nationality"
                  :validator="validate1.nationality"
                  :options="nationality"
                ></ARadioButtonGroup>
              </div>
              <div class="field col-12 lg:col-6">
                <AMultiSelect
                  v-model="form1.interest"
                  label="Interests/Hobbies"
                  :validator="validate1.interest"
                  :options="interest"
                  option-label="label"
                  option-value="value"
                  show-clear
                  filter
                >
                </AMultiSelect>
              </div>
              <div class="field col-12 lg:col-6">
                <ACalendar id="birthDate" v-model="form1.birthDate" :validator="validate1.birthDate" label="Birth Date" />
              </div>
              <div class="field col-12">
                <ATextarea v-model="form1.comment" :validator="validate1.comment" label="Comments" placeholder="Say something"></ATextarea>
              </div>
              <div class="field col-12">
                <ACheckbox v-model="form1.agree" :validator="validate1.agree" label="I agree to the terms and conditions"></ACheckbox>
              </div>
            </div>
          </template>
          <template #footer>
            <Button label="Submit" type="submit" />
          </template>
        </Card>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { required, minValue, sameAs, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import ACheckbox from '../../components/common/input/ACheckbox.vue'

type iform1 = {
  firstName?: string
  lastName?: string
  salary?: number
  noChild?: number
  gender?: string
  nationality?: string
  interest?: string[]
  birthDate?: Date
  comment?: string
  agree: boolean
}
const form1 = reactive<iform1>({
  firstName: undefined,
  lastName: undefined,
  salary: undefined,
  noChild: undefined,
  gender: undefined,
  nationality: undefined,
  birthDate: undefined,
  interest: undefined,
  comment: undefined,
  agree: false
})

const rules = {
  firstName: { required },
  lastName: {},
  salary: {
    required,
    minValue: helpers.withMessage(({ $params }) => {
      // Cast it to prevent ts error
      const minVal = $params as { min: number }
      return `A min of ${minVal.min} is required`
    }, minValue(100000))
  },
  noChild: {},
  gender: { required },
  nationality: { required },
  birthDate: { required },
  interest: { required },
  comment: {},
  agree: {
    mandatory: helpers.withMessage(() => {
      // Cast it to prevent ts error
      return `You must agree to the terms and conditions`
    }, sameAs(true))
  }
}

const validate1 = useVuelidate(rules, form1, { $autoDirty: true })

const gender = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'N', label: 'Neither' }
]

const nationality = [
  { value: 'SG', label: 'Singaporean' },
  { value: 'OTH', label: 'Others' }
]

const interest = [
  { value: 'gaming', label: 'Gaming' },
  { value: 'exercising', label: 'Exercising' },
  { value: 'sleeping', label: 'Sleeping' },
  { value: 'others', label: 'Others' }
]

const toast = useToast()
function doTest() {
  toast.warn('Testing Field Grouping')
}

function doSubmit() {
  console.log('submitted')
}
</script>

<style lang="scss" scoped></style>
