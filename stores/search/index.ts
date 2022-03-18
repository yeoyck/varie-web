import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const showSearch = ref(false)

  return { showSearch }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))

export interface ISearchables {
  condition: { (): boolean }
  search: { (searchKey: string | null | undefined, classType: string): Promise<(string | ISearchResult)[]> }
  select: { (result: ISearchResult): void }
}
export interface ISearchResult {
  classType: string // Match file name. eg: app
  key: string // Unique record identifier eg: app:files:1
  icon?: string // Primary icon (will display infront)
  iconColor?: string
  icon2?: string // Secondary icon (will display at the back)
  icon2Color?: string
  title: string
  subtitle?: string
  subtitle2?: string
  data?: unknown
}
// Compile all available searches
const availableSearchables = import.meta.globEager?.('./searchables/**/*.ts')
const compileSearchables: Record<string, ISearchables> = {}
if (availableSearchables) {
  Object.keys(availableSearchables).forEach((key: string) => {
    const extractKey = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.ts'))
    compileSearchables[extractKey] = availableSearchables[key].default
  })
}

export const searchables = compileSearchables
