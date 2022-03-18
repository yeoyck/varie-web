<template>
  <div>
    <Card class="mb-5">
      <template #title>Expand</template>
      <template #subtitle>URI Templating (RFC6570)</template>
      <template #content> {{ expandedUrl }} </template>
    </Card>
    <Card class="mb-5">
      <template #title>Filter</template>
      <template #subtitle>Filter (Appending URL Request Param)</template>
      <template #content> {{ filteredUrl }} </template>
    </Card>
    <Card class="mb-5">
      <template #title>Fetching Data</template>
      <template #subtitle>A page request showcasing a Typed fetch, api expand/filter, loading, menu link extraction etc</template>
      <template #content>
        <AInputText v-model="startsWith" label="Name Starts With" placeholder="Will list all if its empty" class="w-full"></AInputText>
        <LoaderList v-if="pending" :avatar="false" :line="3"></LoaderList>
        <div v-else-if="data && data.data.length > 0">
          <ul>
            <li v-for="person in data.data" :key="person.fullName">
              {{ person.fullName }} <span v-if="person.email">({{ person.email }})</span>
            </li>
          </ul>
          <Button v-if="data.hasNext" :loading="nextLoading" label="Load More" class="p-button-text p-button-secondary" @click="fetchMore"></Button>
        </div>
        <div v-else>No Data Found</div>
      </template>
    </Card>
    <Card class="mb-5">
      <template #title>Error Handling</template>
      <template #subtitle>Handling error at field level, page level (notify, alert)</template>
      <template #content>
        <Alert ref="alert"></Alert>
        <Button class="p-button-secondary" @click="testError1">Test Page Level Error</Button>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()

// Expand Showcase
const expandedUrl = $api.expand('http://localhost/test/{id}{?page,size}', {
  id: 100 + '',
  page: 0 + '',
  size: 10 + ''
})

// Filter Showcase
const filteredUrl = $api.filter(
  'http://localhost/test?tmp=1',
  [
    { key: 'firstName(contains)', value: 'Kiat', type: 'STRING' },
    { key: 'birthDate(lt)', value: new Date(), type: 'DATE' }
  ],
  'firstName(desc)'
)

// Fetch page Showcase
interface IPageData {
  fullName: string
  email?: string
  birthDate?: Date
}
interface IPage {
  data: IPageData[]
  hasNext: boolean
  hasPrevious: boolean
  _links: links
}
const startsWith = ref('C')
watchDebounced(
  startsWith,
  () => {
    refresh()
  },
  { debounce: 500 }
)
const { pending, data, refresh } = useLazyAsyncData(
  'samplePage',
  () =>
    $api.$get<IPage>(
      $api.filter(
        $api.expand('list{?page,size}', {
          page: '0',
          size: '5'
        }),
        startsWith.value !== '' ? [{ key: 'fullName(start)', value: startsWith.value, type: 'STRING' }] : [],
        'fullName'
      )
    ),
  { server: false }
)
const nextLoading = ref(false)

async function fetchMore() {
  if (data.value.hasNext && data.value._links.next) {
    try {
      nextLoading.value = true
      const moreData = await $api.$get<IPage>(data.value._links.next.href)
      moreData.data = [...data.value.data, ...moreData.data]
      data.value = moreData
      nextLoading.value = false
    } catch (err) {
      nextLoading.value = false
      console.log(err)
    }
  }
}
// Error handling Showcase
const toast = useToast()
const alert = ref<alert>()
async function testError1() {
  try {
    await $api.$get('testException')
  } catch (err) {
    // Using Toast/Notify to respond
    toast.response(err)
    alert.value?.response(err)
  }
}
</script>

<style lang="scss" scoped></style>
