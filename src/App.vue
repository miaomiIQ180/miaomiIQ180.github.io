<template>
  <button
    type="button"
    class="plus-iq"
    :class="{ pressed: isPressed }"
    @click="play()"
    @mousedown="isPressed = true"
    @mouseup="isPressed = false"
    @mouseleave="isPressed = false"
    @blur="isPressed = false"
  >
    <img v-show="!isPressed" src="/img/miaomi_normal_300.webp" alt="Miaomi">
    <!-- FIXME: first load blinking problem -->
    <img v-show="isPressed" src="/img/miaomi_pressed_300.webp" alt="Miaomi pressed">
  </button>
</template>

<script setup lang="ts">
import kirby1up from "@/assets/sound/kirby-1up.mp3";

const isPressed = ref(false);

const { play } = useSound(kirby1up);
</script>

<style lang="scss" scoped>
.plus-iq {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  aspect-ratio: 1;
  overflow: hidden;
  border: none;
  border-radius: 10rem;
  padding: .5rem .5rem 0;
  &.pressed {
    img {
      margin-top: 1rem;
    }
  }
}
</style>
