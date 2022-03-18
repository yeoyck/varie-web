<template>
  <div>
    <h5>Responsive Design</h5>
    <div class="font-500 mb-5">
      Most of the samples can be found on <a href="https://www.primefaces.org/primeflex/gridsystem" target="_blank">PrimeFlex's Grid</a>
    </div>
    <h6>Grid (Based on primeflex - which uses flexbox)</h6>
    <div class="grid">
      <div v-for="i in 4" :key="i" class="col-12 md:col-6 lg:col-3">
        <Card>
          <template #content>
            <div class="flex justify-content-center align-items-center">{{ i }}</div>
          </template>
        </Card>
      </div>
    </div>
    <h6>Grid (No Gutters)</h6>
    <div class="grid grid-nogutter">
      <div v-for="i in 4" :key="i" class="col-12 md:col-6 lg:col-3">
        <Card>
          <template #content>
            <div class="flex justify-content-center align-items-center">{{ i }}</div>
          </template>
        </Card>
      </div>
    </div>
    <h6>Grid (Hidding content on smaller screen size)</h6>
    <div class="grid">
      <div v-for="i in 4" :key="i" :class="['col-12 md:col-6 lg:col-3', { hidden: i === 3, 'md:inline-block': i === 3 }]">
        <Card>
          <template #content>
            <div class="flex justify-content-center align-items-center">{{ i }}</div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
