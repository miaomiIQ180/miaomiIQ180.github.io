<template>
  <div class="container">
    <h1>喵咪現在是</h1>
    <p class="current-iq">IQ{{ iq }}</p>
    <div class="btn-holder">
      <button
        ref="plusIqBtn"
        type="button"
        class="plus-iq"
        :class="{ pressed: isPressed }"
        @mousedown="handlePressed"
        @mouseup="handleRelease"
        @mouseleave="isPressed = false"
        @touchstart="handlePressed"
        @touchend.prevent="handleRelease"
        @touchmove="cancelTouch"
        @keydown.space.enter="handlePressed"
        @keyup.space.enter="handleRelease"
        @blur="isPressed = false"
      >
        <template v-if="isNormalImgReady && isPressedImgReady">
          <img v-show="!isPressed" src="/img/miaomi_normal_300.webp" alt="Miaomi">
          <!-- FIXME: first load blinking problem -->
          <img v-show="isPressed" src="/img/miaomi_pressed_300.webp" alt="Miaomi pressed">
        </template>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import kirby1up from "@/assets/sound/kirby-1up.mp3";

const title = useTitle();

// IQ Counter
const iq = ref(0);

// Button
const plusIqBtn = useTemplateRef<HTMLButtonElement>("plusIqBtn");
const { isOutside: isBtnOutside } = useMouseInElement(plusIqBtn);
const isPressed = ref(false);
const { isReady: isNormalImgReady } = useImage({ src: "/img/miaomi_normal_300.webp" });
const { isReady: isPressedImgReady } = useImage({ src: "/img/miaomi_pressed_300.webp" });

// Handle button click
const { play: play1up } = useSound(kirby1up);
const { vibrate } = useVibrate({ pattern: 100 });
function handlePressed(e: Event) {
  isPressed.value = true;
  vibrate();
}
function handleRelease(e: Event) {
  if (!isPressed.value) {
    return;
  }
  iq.value++;
  title.value = `喵咪是IQ${iq.value}！`;
  isPressed.value = false;
  play1up();
}

// Handle button touch
function cancelTouch(e: TouchEvent) {
  if (isBtnOutside.value) {
    isPressed.value = false;
  }
}

// Handle site not active
const isSiteActive = useDocumentVisibility();
const { pause, resume } = useIntervalFn(() => {
  title.value = title.value === "OAO..." ? `理我QQ...` : "OAO...";
}, 500, { immediate: false });

watch(isSiteActive, (newState) => {
  if (newState === "visible") {
    title.value = `喵咪是IQ${iq.value}！`;
    pause();
  } else {
    title.value = `理我QQ...`;
    resume();
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  place-content: center;
  height: inherit;
  > h1 {
    text-align: center;
    margin: 0;
  }
}

.current-iq {
  color: rgb(var(--iq-text));
  font-size: 3.5rem;
  text-align: center;
  font-weight: bold;
  -webkit-text-stroke: 2px rgb(var(--iq-border));
  margin: 1.25rem 0 2rem;
}

.btn-holder {
  --btn-size: 15rem;
  width: var(--btn-size);
  height: var(--btn-size);
  aspect-ratio: 1;
}

.plus-iq {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--btn-size);
  height: var(--btn-size);
  overflow: hidden;
  border: none;
  border-radius: 10rem;
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
