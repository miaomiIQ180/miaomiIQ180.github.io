<template>
  <div class="paw-loading">
    <Icon icon="custom:paw" class="paw-1" />
    <Icon icon="custom:paw" class="paw-2" />
    <Icon icon="custom:paw" class="paw-3" />
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@keyframes looping {
  0% { font-size: 0; }
  40% { font-size: 2.5rem; }
  60% { font-size: 2.5rem; }
  100% { font-size: 0; }
}
.paw-loading {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 1rem;
  .iconify {
    color: rgb(var(--color-theme3));
    font-size: 0;
    width: 2.5rem;
    animation: looping 1.75s ease infinite;
  }
  .paw-2 {
    animation-delay: .2s;
  }
  .paw-3 {
    animation-delay: .4s;
  }
}
</style>
