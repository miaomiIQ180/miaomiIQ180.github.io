<template>
  <div class="container">
    <h1>喵咪現在是</h1>
    <p class="current-iq">IQ{{ iq }}</p>
    <ButtonArea />
    <SocialAccounts />
  </div>
</template>

<script setup lang="ts">
const { iq } = storeToRefs(useAppStore());
</script>

<style lang="scss" scoped>

</style>
