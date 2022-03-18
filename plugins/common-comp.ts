import { defineNuxtPlugin } from '#app'
import Alert from '~~/components/common/Alert.vue'
import ACalendar from '~~/components/common/input/ACalendar.vue'
import ACheckbox from '~~/components/common/input/ACheckbox.vue'
import ADropdown from '~~/components/common/input/ADropdown.vue'
import AInputNumber from '~~/components/common/input/AInputNumber.vue'
import AInputText from '~~/components/common/input/AInputText.vue'
import AMultiSelect from '~~/components/common/input/AMultiSelect.vue'
import ARadioButtonGroup from '~~/components/common/input/ARadioButtonGroup.vue'
import ATextarea from '~~/components/common/input/ATextarea.vue'
import List from '~~/components/common/list/List.vue'
import ListItem from '~~/components/common/list/ListItem.vue'
import ListItemAction from '~~/components/common/list/ListItemAction.vue'
import ListItemActionText from '~~/components/common/list/ListItemActionText.vue'
import ListItemContent from '~~/components/common/list/ListItemContent.vue'
import ListItemSubtitle from '~~/components/common/list/ListItemSubtitle.vue'
import ListItemTitle from '~~/components/common/list/ListItemTitle.vue'
import LoaderList from '~~/components/common/loader/LoaderList.vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Common Components
  nuxtApp.vueApp.component('Alert', Alert)

  nuxtApp.vueApp.component('ACalendar', ACalendar)
  nuxtApp.vueApp.component('ACheckbox', ACheckbox)
  nuxtApp.vueApp.component('ADropdown', ADropdown)
  nuxtApp.vueApp.component('AInputText', AInputText)
  nuxtApp.vueApp.component('AInputNumber', AInputNumber)
  nuxtApp.vueApp.component('AMultiSelect', AMultiSelect)
  nuxtApp.vueApp.component('ARadioButtonGroup', ARadioButtonGroup)
  nuxtApp.vueApp.component('ATextarea', ATextarea)

  nuxtApp.vueApp.component('List', List)
  nuxtApp.vueApp.component('ListItem', ListItem)
  nuxtApp.vueApp.component('ListItemContent', ListItemContent)
  nuxtApp.vueApp.component('ListItemTitle', ListItemTitle)
  nuxtApp.vueApp.component('ListItemSubtitle', ListItemSubtitle)
  nuxtApp.vueApp.component('ListItemAction', ListItemAction)
  nuxtApp.vueApp.component('ListItemActionText', ListItemActionText)

  nuxtApp.vueApp.component('LoaderList', LoaderList)
})
