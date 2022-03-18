<template>
  <ClientOnly>
    <Sidebar v-model:visible="store.showSearch" position="right" class="search-bar">
      <span class="p-input-icon-left p-input-icon-right w-full">
        <i class="pi pi-search" />
        <InputText ref="searchInput" v-model="searchText" type="text" placeholder="Search (Ctrl+K)" class="w-full" />
        <i v-show="loading" class="pi pi-spin pi-spinner" />
      </span>
      <!-- <div
        v-if="searchText.length > 0 && !loading && filteredResults.length === 0"
        class="flex justify-content-center align-items-center h-12rem text-center white-space-nowrap overflow-hidden"
      >
        <span class="font-medium">
          No results for "<span class="font-bold">{{ searchText }}</span
          >"
        </span>
      </div> -->
      <List>
        <template v-for="item in filteredResults" :key="item.key">
          <div v-if="typeof item === 'string'" class="font-semibold p-2">
            {{ item }}
          </div>
          <ListItem v-else @click="selectSearch(item)">
            <ListItemAction>
              <i v-if="item.icon" :class="item.icon" :style="item.iconColor ? { color: `var(--${item.iconColor})` } : undefined"></i>
            </ListItemAction>
            <ListItemContent>
              <ListItemTitle>{{ item.title }}</ListItemTitle>
              <ListItemSubtitle>{{ item.subtitle }}</ListItemSubtitle>
            </ListItemContent>
          </ListItem>
        </template>
      </List>
    </Sidebar>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ISearchResult, searchables, useSearchStore } from '@/stores/search'

const store = useSearchStore()
const toast = useToast()
const searchInput = ref<HTMLFormElement | null>(null)
const searchText = ref<string>('')
const searchIdentifier = ref(0) // Unique identity for each search attempt

const results = ref<Record<number, (string | ISearchResult)[]>>({})
const loaders = ref<
  Record<
    number,
    {
      total: number
      completed: number
    }
  >
>({})

const loading = computed(() => {
  if (loaders.value[searchIdentifier.value]) {
    return !(loaders.value[searchIdentifier.value].total === loaders.value[searchIdentifier.value].completed)
  }
  return false
})
const filteredResults = computed(() => {
  return results.value[searchIdentifier.value] || []
})

watchEffect(() => {
  // When search is active, focus on text input
  // also clear input after leaving and entering
  searchText.value = ''
  if (store.showSearch) {
    if (searchInput?.value?.$el) {
      searchInput.value.$el.focus()
    }
  }
})
watchDebounced(
  searchText,
  (val) => {
    doSearch(val)
  },
  { debounce: 500 }
)
function doSearch(val: string) {
  // Reset tmpLoading
  if (val && searchables && Object.keys(searchables).length > 0) {
    // Remove Past Results
    removeIdentifier(searchIdentifier.value)

    // New Identity
    const identity = searchIdentifier.value + 1
    searchIdentifier.value++

    // Adding new identity to results/loaders
    loaders.value[identity] = {
      total: 0,
      completed: 0
    }
    results.value[identity] = []

    // Loop through the searchables and search on those that met the condition
    Object.keys(searchables).forEach((classType) => {
      const searchable = searchables[classType]
      if (searchable.condition()) {
        // Adding the total of searchable (to tally with completed for loading)
        if (loaders.value[identity]) {
          loaders.value[identity].total++
        }
        searchable
          .search(val, classType)
          .then((res) => {
            if (res?.length > 0 && results.value[identity]) {
              const limitResult: (string | ISearchResult)[] = []
              for (let i = 0; i < res.length; i++) {
                // Limit result to 5 (excluding the header)
                if (i > 5) break

                limitResult.push(res[i])
              }
              // Adding searchable results to consolidated results
              results.value[identity] = [...results.value[identity], ...limitResult]
            }
            if (loaders.value[identity]) {
              loaders.value[identity].completed++
            }
          })
          .catch(() => {
            if (loaders.value[identity]) {
              loaders.value[identity].completed++
            }
          })
      }
    })
  } else {
    results.value = {}
    loaders.value = {}
  }
}
function removeIdentifier(identifier: number) {
  if (results.value[identifier]) {
    delete results.value[identifier]
  }
  if (loaders.value[identifier]) {
    delete loaders.value[identifier]
  }
}

function selectSearch(item: string | ISearchResult) {
  if (item && typeof item === 'object' && item.classType) {
    const searchable = searchables[item.classType]
    if (searchable) {
      searchable.select(item)

      // Close Dialog
      store.showSearch = false
    } else {
      toast.error('Invalid Search Type')
    }
  }
}
</script>

<style lang="scss">
.search-bar {
  width: 25rem !important;
}
@media (max-width: 767px) {
  .search-bar {
    width: 100% !important;
  }
}
</style>
