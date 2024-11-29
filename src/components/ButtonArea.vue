<template>
  <div
    class="button-area"
    :class="{ pressing: isPressed }"
  >
    <button ref="plusIqBtn" type="button" @click="addIq()">
      <template v-if="isPressed">Plusing 1</template>
      <template v-else>Plus one</template>
    </button>
  </div>
</template>

<script setup lang="ts">
const { addIq } = useAppStore();

const plusIqBtn = ref<HTMLButtonElement | null>(null);
const { pressed: isPressed } = useMousePressed({ target: plusIqBtn });
whenever(() => !isPressed.value, () => {
  addIq();
});
</script>

<style lang="scss" scoped>

</style>
