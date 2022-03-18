<template>
  <NuxtLayout name="default" :breadcrumb="false">
    <b>Sample to disable breadcrumb</b>
    <p>Currently there is a bug that reload the menu when accessing this page (and out of this page)</p>
  </NuxtLayout>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: false
})
</script>
