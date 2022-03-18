// @unocss-include
import { klona } from 'klona'
import { useUserStore } from './user'
import { acceptHMRUpdate, defineStore } from 'pinia'

export interface IMenu {
  key?: string // (used by flatten menu)
  name?: string // route name
  title?: string
  icon?: string
  iconColor?: string
  image?: string
  url?: string
  target?: string
  badge?: string
  class?: string
  style?: Record<string, string>
  visible?: boolean | { (item: IMenu): boolean }
  disabled?: boolean | { (item: IMenu): boolean }
  command?: { (obj: IMenuPassback): void }
  // auth?: string[] | { (item: IMenu): boolean }
  auth?: string[]
  items?: IMenu[]
  module?: boolean // Define if item is a module (only for 2nd level)
  separator?: boolean // Use as menu seperator
  actionIcon?: string // Secondary action for menu
}

export interface IMenuPassback {
  originalEvent: Event
  item: IMenu
}

export const useMenuStore = defineStore('menu', () => {
  const menu: IMenu[] = [
    {
      name: 'index',
      title: 'Dashboard',
      icon: 'i-flat-color-icons:home',
      items: [
        {
          name: 'crm',
          title: 'CRM',
          icon: 'i-flat-color-icons:briefcase',
          auth: ['crm'],
          module: true,
          items: [
            {
              name: 'crm-leads',
              title: 'Leads',
              icon: 'i-flat-color-icons:idea'
            },
            {
              name: 'crm-contacts',
              title: 'Prospects',
              icon: 'i-flat-color-icons:contacts'
            },
            {
              name: 'crm-clients',
              title: 'Clients',
              icon: 'i-flat-color-icons:businessman'
            },
            {
              name: 'crm-cases',
              title: 'Cases',
              icon: 'i-flat-color-icons:package'
            },
            {
              name: 'crm-servicing',
              title: 'Transactions',
              icon: 'i-flat-color-icons:database',
              items: [
                {
                  name: 'crm-servicing-li',
                  title: 'Life Insurances',
                  icon: 'i-flat-color-icons:like'
                },
                {
                  name: 'crm-servicing-gi',
                  title: 'General Insurances',
                  icon: 'i-flat-color-icons:automotive'
                },
                {
                  name: 'crm-servicing-grp',
                  title: 'Group Insurances',
                  icon: 'i-flat-color-icons:conference-call'
                },
                {
                  name: 'crm-servicing-inv',
                  title: 'Investments',
                  icon: 'i-flat-color-icons:bullish'
                },
                {
                  name: 'crm-servicing-oth',
                  title: 'Other Services',
                  icon: 'i-flat-color-icons:medium-priority'
                }
              ]
            },
            { name: 'crm-events', title: 'Events', icon: 'i-flat-color-icons:calendar' },
            {
              name: 'crm-stats',
              title: 'Performance',
              icon: 'i-flat-color-icons:statistics'
            },
            {
              name: 'crm-email',
              title: 'Mass Email',
              icon: 'i-flat-color-icons:business'
            },
            { name: 'crm-tasks', title: 'Tasks', icon: 'i-flat-color-icons:inspection' },
            { name: 'crm-notes', title: 'Notes', icon: 'i-flat-color-icons:edit-image' },
            { name: 'crm-files', title: 'Files', icon: 'i-flat-color-icons:file' }
          ]
        },
        {
          name: 'admin',
          title: 'Admin',
          icon: 'i-flat-color-icons:key',
          auth: ['admin'],
          module: true,
          items: [
            {
              name: 'admin-users',
              title: 'Users',
              icon: 'i-flat-color-icons:conference-call',
              items: [
                {
                  name: 'admin-users-list',
                  title: 'Users List',
                  icon: 'i-flat-color-icons:list',
                  items: [
                    {
                      name: 'admin-users-list-usrId',
                      title: 'User Profile',
                      visible: false
                    }
                  ]
                },
                { name: 'admin-users-roles', title: 'Roles', icon: 'i-flat-color-icons:data-protection' }
              ]
            },
            {
              name: 'admin-organisations',
              title: 'Organisations',
              icon: 'i-flat-color-icons:organization'
            }
          ]
        },
        {
          name: 'sample',
          title: 'Sample',
          icon: 'i-flat-color-icons:binoculars',
          module: true,
          items: [
            {
              name: 'sample-fullpage',
              title: 'Layout: Full Page'
            },
            {
              name: 'sample-flex',
              title: 'Flex'
            },
            {
              name: 'sample-grid',
              title: 'Grid'
            },
            {
              name: 'sample-form',
              title: 'Forms'
            },
            {
              name: 'sample-global-error',
              title: 'Global Error'
            },
            {
              name: 'sample-profile',
              title: 'Build/Label Profile'
            },
            {
              name: 'sample-api',
              title: 'API / Form Error'
            }
          ]
        }
      ]
    }
  ]

  const flattenMenu = doFlattenMenu(menu)

  // Flatten the menu into format of eg:0:0:1, 0:0:1:1
  // To easily find menu item and to track breadcrumb
  function doFlattenMenu(targetMenu: IMenu[] | undefined): Record<string, IMenu> {
    const cloneMenu = targetMenu ? klona(targetMenu) : []
    const toReturn: Record<string, IMenu> = {}
    for (const i in cloneMenu) {
      if (!Object.prototype.hasOwnProperty.call(cloneMenu, i)) continue
      if (cloneMenu[i].items) {
        toReturn[i] = cloneMenu[i]
        const flattenChild = doFlattenMenu(cloneMenu[i].items)
        for (const y in flattenChild) {
          if (!Object.prototype.hasOwnProperty.call(flattenChild, y)) continue

          toReturn[i + '.' + y] = flattenChild[y]
        }
      } else {
        toReturn[i] = cloneMenu[i]
      }
    }
    return toReturn
  }

  function getFlattenMenu(name: string | null | undefined) {
    if (name) {
      const result = Object.keys(flattenMenu).reduce(function (r: Record<string, IMenu>, e: string) {
        if (flattenMenu[e].name && flattenMenu[e].name === name) {
          r[e] = flattenMenu[e]
        }
        return r
      }, {})
      if (result && Object.keys(result).length > 0) {
        // Return the 1st result of the filter
        const formatResult = result[Object.keys(result)[0]]
        Object.assign(formatResult, { key: Object.keys(result)[0] })
        return formatResult
      }
    }
    return null
  }

  // Available modules
  // Can only be done post auth
  const modules = ref<IMenu[]>([])
  function compileModules() {
    const moduleLevel = klona(menu[0].items)
    if (moduleLevel) {
      const filteredModule = moduleLevel.filter((x) => x.module)
      filterMenu(filteredModule, true, false)
      modules.value = filteredModule
    } else {
      modules.value = []
    }
  }

  // Store active module (from App.vue)
  // Cannot use computed as every route will trigger a recomputation that will affect other computed listening to this
  const activeModule = ref<string | null>(null)

  // To remove menu items on menu:auth (and non-visible menu)
  // treeCheck: whether to check children items
  function filterMenu(items: IMenu[], removeHidden = true, treeCheck = true) {
    if (items?.length > 0) {
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i]
        // Check if it is permitted
        if ((removeHidden && item.visible === false) || !useUserStore().checkAccess(item.auth)) {
          // Remove not permitted item
          items.splice(i, 1)
        }
        if (treeCheck && item.items) {
          filterMenu(item.items, treeCheck)
        }
      }
    }
  }

  function getBreadcrumb(key: string | undefined) {
    const result: IMenu[] = []
    if (key) {
      findMenuParent(key, result)
    }
    return result
  }

  function findMenuParent(key: string, result: IMenu[]) {
    if (flattenMenu[key]) {
      result.unshift(flattenMenu[key])
      // Recursive to dig out parent history
      if (key.lastIndexOf('.') !== -1) {
        const nextKey = key.substring(0, key.lastIndexOf('.'))
        findMenuParent(nextKey, result)
      }
    }
  }
  return { menu, flattenMenu, modules, activeModule, compileModules, doFlattenMenu, filterMenu, getFlattenMenu, getBreadcrumb }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
