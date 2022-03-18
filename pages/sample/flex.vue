<template>
  <div>
    <Card class="mb-5">
      <template #title>Spacer</template>
      <template #subtitle>This is to add spacing to push content to the end. Similar to how we use v-spacer in Vuetify</template>
      <template #content>
        <h6>Using CSS: Flex</h6>
        <div class="flex">
          <Button icon="pi pi-check" class="p-button-rounded p-button-text" />
          <Button icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text" />
          <Button icon="pi pi-search" class="p-button-rounded p-button-success p-button-text" />
          <Button icon="pi pi-user" class="p-button-rounded p-button-info p-button-text" />
          <div class="flex-auto"></div>
          <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />
          <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text" />
          <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />
          <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text" />
          <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />
          <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text" />
          <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />
          <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text" />
          <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />
          <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text" />
        </div>
        <h6>Using CSS: Flex (with wrap)</h6>
        <span class="font-500">Try resize the screen</span>
        <div class="flex flex-wrap">
          <Button icon="pi pi-check" class="p-button-rounded p-button-text" />
          <Button icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text" />
          <Button icon="pi pi-search" class="p-button-rounded p-button-success p-button-text" />
          <Button icon="pi pi-user" class="p-button-rounded p-button-info p-button-text" />
          <div class="flex-auto"></div>
          <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />
          <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text" />
          <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />
          <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text" />
          <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />
          <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text" />
          <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />
          <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text" />
          <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />
          <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text" />
        </div>
        <h6>Using Prime Toolbar (which uses flex: justify-content: inbetween)</h6>
        <Toolbar>
          <template #start>
            <Button icon="pi pi-check" class="p-button-rounded p-button-text" />
            <Button icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text" />
            <Button icon="pi pi-search" class="p-button-rounded p-button-success p-button-text" />
            <Button icon="pi pi-user" class="p-button-rounded p-button-info p-button-text" />
          </template>

          <template #end>
            <Button icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text" />
            <Button icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text" />
          </template>
        </Toolbar>
      </template>
    </Card>
    <Card class="mb-5">
      <template #title>Center Content</template>
      <template #subtitle>To center content using flex</template>
      <template #content>
        <div class="h-20rem flex justify-content-center align-items-center">
          <div>
            <div>Line 1</div>
            <div>Line 2</div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
