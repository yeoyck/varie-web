<template>
  <Card class="mb-5">
    <template #title>Global Error</template>
    <template #subtitle>There is a catch all if there is a fatal error that cant be handled in anyway</template>
    <template #content>
      <div class="grid">
        <div class="col-12">Handling of global error</div>
        <div class="col-12"><Button @click="showError">Throw Error</Button></div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
function showError() {
  throwError(new Error('Testing Gloabl Error'))
}
</script>

<style lang="scss" scoped></style>
