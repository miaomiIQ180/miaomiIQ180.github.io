<template>
  <div class="button-area">
    <button type="button" @click="addIq()">Plus one</button>
  </div>
</template>

<script setup lang="ts">
const { addIq } = useAppStore();
</script>

<style lang="scss" scoped>

</style>
