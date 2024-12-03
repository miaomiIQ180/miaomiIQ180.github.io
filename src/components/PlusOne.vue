<template>
  <div class="plus-one">
    <div
      v-for="item in plusOneItems"
      :key="item.id"
      class="plus-one__item"
      :style="{
        '--pos-x': `${item.x}px`,
        '--pos-y': `${item.y}px`,
      }"
    >
      +1
    </div>
  </div>
</template>

<script setup lang="ts">
interface typePlusOneItem {
  id: number,
  x: number,
  y: number,
}
const plusOneItems = ref<typePlusOneItem[]>([]);

function add(id: number, x: number, y: number) {
  plusOneItems.value.push({ id, x, y });
  setTimeout(() => {
    plusOneItems.value.shift();
  }, 800);
}

defineExpose({
  add,
});
</script>

<style lang="scss" scoped>
.plus-one__item {
  color: rgb(var(--color-theme1));
  font-size: 2rem;
  font-weight: bold;
  position: fixed;
  top: calc(var(--pos-y) - 6rem);
  left: var(--pos-x);
  text-shadow: 0 0 2px #fff;
  -webkit-text-stroke: 1px #fff;
  transform: translateX(-50%);
  user-select: none;
  pointer-events: none;
  animation: floatUp .7s ease-out;
  opacity: 0;
  z-index: 3;
}
@keyframes floatUp {
  0% {
    opacity: 0;
    top: var(--pos-y);
  }
  50% {
    opacity: 1;
  }
  100% {
  }
}
</style>
