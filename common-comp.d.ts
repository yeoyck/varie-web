import Alert from './components/common/Alert.vue'
import ACalendar from './components/common/input/ACalendar.vue'
import ACheckbox from './components/common/input/ACheckbox.vue'
import ADropdown from './components/common/input/ADropdown.vue'
import AInputNumber from './components/common/input/AInputNumber.vue'
import AInputText from './components/common/input/AInputText.vue'
import AMultiSelect from './components/common/input/AMultiSelect.vue'
import ARadioButtonGroup from './components/common/input/ARadioButtonGroup.vue'
import ATextarea from './components/common/input/ATextarea.vue'
import List from './components/common/list/List.vue'
import ListItem from './components/common/list/ListItem.vue'
import ListItemAction from './components/common/list/ListItemAction.vue'
import ListItemActionText from './components/common/list/ListItemActionText.vue'
import ListItemContent from './components/common/list/ListItemContent.vue'
import ListItemSubtitle from './components/common/list/ListItemSubtitle.vue'
import ListItemTitle from './components/common/list/ListItemTitle.vue'
import LoaderList from './components/common/loader/LoaderList.vue'

declare module 'vue' {
  export interface GlobalComponents {
    Alert: typeof Alert
    ACalendar: typeof ACalendar
    ACheckbox: typeof ACheckbox
    ADropdown: typeof ADropdown
    AInputNumber: typeof AInputNumber
    AInputText: typeof AInputText
    AMultiSelect: typeof AMultiSelect
    ARadioButtonGroup: typeof ARadioButtonGroup
    ATextarea: typeof ATextarea
    List: typeof List
    ListItem: typeof ListItem
    ListItemAction: typeof ListItemAction
    ListItemActionText: typeof ListItemActionText
    ListItemContent: typeof ListItemContent
    ListItemSubtitle: typeof ListItemSubtitle
    ListItemTitle: typeof ListItemTitle
    LoaderList: typeof LoaderList
  }
}
