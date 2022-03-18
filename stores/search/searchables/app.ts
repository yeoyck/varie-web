import { ISearchables, ISearchResult } from '../index'
import { useMenuStore, IMenu } from '@/stores/menu'
import { klona } from 'klona'

// Cannot init here as pinia has not been init (run build will have error)
let menuStore: undefined | ReturnType<typeof useMenuStore>
let flattenMenu: undefined | Record<string, IMenu>

const searchable: ISearchables = {
  condition() {
    // TODO need to check if the auth runs before this as it will affect the filtermenu
    if (!menuStore) {
      const nuxtContext = useNuxtApp()
      menuStore = useMenuStore(nuxtContext.pinia)
      const clonedMenu = klona(menuStore.menu)
      menuStore.filterMenu(clonedMenu, true, true)
      flattenMenu = menuStore.doFlattenMenu(clonedMenu)
    }
    return true
  },
  search(searchKey, classType) {
    return new Promise((resolve) => {
      const tempSearchResults = searchFlattenMenu(searchKey)
      if (tempSearchResults && Object.keys(tempSearchResults).length !== 0) {
        const searchResults: (ISearchResult | string)[] = []
        const keys = Object.keys(tempSearchResults)
        for (let i = 0; i < keys.length; i++) {
          const tempSearchResult = tempSearchResults[keys[i]]

          if (tempSearchResult.title) {
            // Adding breadcrumb
            const breadcrumb = menuStore?.getBreadcrumb(keys[i]) ?? undefined
            let breadcrumbStr: string | undefined = undefined
            if (breadcrumb && breadcrumb.length > 0) {
              for (let x = 0; x < breadcrumb.length; x++) {
                // If using modules, ignore dashboard
                if (x === 0) {
                  if (menuStore?.modules.length === 0) {
                    breadcrumbStr = breadcrumb[x].title
                  }
                } else if (!breadcrumbStr) {
                  breadcrumbStr = breadcrumb[x].title
                } else {
                  breadcrumbStr = breadcrumbStr + ' > ' + breadcrumb[x].title
                }
              }
            }
            searchResults.push({
              classType,
              key: `${classType}:${tempSearchResult.title}`,
              title: tempSearchResult.title,
              icon: tempSearchResult.icon ?? 'pi pi-file',
              iconColor: tempSearchResult.iconColor ?? undefined,
              subtitle: breadcrumbStr ?? undefined,
              data: tempSearchResult
            })
          }
        }
        if (searchResults.length > 0) {
          searchResults.unshift('Application')
        }
        resolve(searchResults)
      } else {
        resolve([])
      }
    })
  },
  select(item) {
    if (item?.data && (item.data as IMenu)?.name) {
      const router = useRouter()
      router.push({ name: (item.data as IMenu).name })
    }
  }
}

function searchFlattenMenu(keyword: string | undefined | null): Record<string, IMenu> {
  const formattedKeyword = keyword ? keyword.toLowerCase() : keyword
  const tempMenu = flattenMenu || {}
  if (formattedKeyword) {
    const result = Object.keys(tempMenu).reduce(function (r: Record<string, IMenu>, e: string) {
      const formattedTitle = tempMenu[e]?.title?.toLowerCase() ?? tempMenu[e].title
      if (formattedTitle && formattedTitle.includes(formattedKeyword)) {
        r[e] = tempMenu[e]
      }
      return r
    }, {})
    return result
  } else {
    return {}
  }
}

export default searchable
