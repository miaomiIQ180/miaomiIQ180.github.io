<template>
  <div class="container">
    <h1>喵咪現在是</h1>
    <p class="current-iq">IQ{{ iq }}</p>
    <button type="button" @click="addIq()">Plus one</button>
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore();
const { iq } = storeToRefs(appStore);
const { addIq } = appStore;
</script>

<style lang="scss" scoped>

</style>
