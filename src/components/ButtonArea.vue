<template>
  <div
    class="button-area"
    :class="{ pressing: isPressed }"
  >
    <button
      ref="plusIqBtn"
      type="button"
      class="plus-iq"
    >
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
.button-area {
  --btn-size: 15rem;
  text-align: center;
  width: 100%;
}

.plus-iq {
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: var(--btn-size);
  height: var(--btn-size);
  overflow: hidden;
  background: #e9e9ed;
  border: none;
  border-radius: var(--btn-size);
  padding: 0;
  transition: all .15s ease;
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  img {
    pointer-events: none;
  }
  &.pressed {
    padding-top: 1rem;
  }
  &:hover {
    background: rgb(var(--color-theme4));
  }
}
</style>
