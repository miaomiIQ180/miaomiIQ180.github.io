<template>
  <Transition name="loading">
    <div v-if="show || keepOpen" class="loading-shade">
      <PawLoading />
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  show?: boolean,
}>();

const keepOpen = ref(false);
whenever(() => props.show, async () => {
  keepOpen.value = true;
  await promiseTimeout(1500);
  keepOpen.value = false;
}, { immediate: true });
</script>

<style lang="scss" scoped>
.loading-shade {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(var(--color-theme1));
  z-index: 1000;
}

.loading {
  &-enter-from, &-leave-to {
    top: 100%;
  }
  &-move, &-enter-active, &-leave-active {
    transition: all .3s ease;
  }
}
</style>
