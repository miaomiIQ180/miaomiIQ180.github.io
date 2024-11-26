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
        <template v-if="miaomiCry">
          <img v-show="!isPressed" src="/img/miaomi_cry_300.webp" alt="Miaomi cried">
        </template>
        <template v-else-if="isNormalImgReady && isPressedImgReady">
          <img v-show="!isPressed" src="/img/miaomi_normal_300.webp" alt="Miaomi">
          <img v-show="isPressed" src="/img/miaomi_pressed_300.webp" alt="Miaomi pressed">
        </template>
        <div class="hairpin">IQ{{ iq }}</div>
      </button>
    </div>
  </div>
  <PlusOne ref="plusOne" />
  <SocialAccounts />
</template>

<script setup lang="ts">
import kirby1up from "@/assets/sound/kirby-1up.mp3";
import PlusOne from "./components/PlusOne.vue";

const title = useTitle();
const { x: mouseX, y: mouseY } = useMouse();

// #region : IQ Counter
const iq = useLocalStorage("iq", 0);
provide("iq", iq);
// #endregion

// #region : Button
const plusIqBtn = useTemplateRef<HTMLButtonElement>("plusIqBtn");
const { isOutside: isBtnOutside } = useMouseInElement(plusIqBtn);
const isPressed = ref(false);
const { isReady: isNormalImgReady } = useImage({ src: "/img/miaomi_normal_300.webp" });
const { isReady: isPressedImgReady } = useImage({ src: "/img/miaomi_pressed_300.webp" });
// #endregion

// #region : Handle button click
const plusOne = useTemplateRef<InstanceType<typeof PlusOne>>("plusOne");
const miaomiCry = ref(false);

const { play: play1up } = useSound(kirby1up);
const { vibrate } = useVibrate({ pattern: 100 });
function handlePressed(e: Event) {
  isPressed.value = true;
  miaomiCry.value = false;
  vibrate();
}
function handleRelease(e: Event) {
  if (!isPressed.value) {
    return;
  }
  iq.value++;
  plusOne.value?.add(iq.value, mouseX.value, mouseY.value);
  isPressed.value = false;
  play1up();
}

watch(iq, (newIq) => {
  title.value = `喵咪是IQ${newIq}！`;
});
// #endregion

// #region : Handle button touch
function cancelTouch(e: TouchEvent) {
  if (isBtnOutside.value) {
    isPressed.value = false;
  }
}
// #endregion

// #region : Handle site not active
const isSiteActive = useDocumentVisibility();
const { pause, resume } = useIntervalFn(() => {
  title.value = title.value === "OAO..." ? `理我QQ...` : "OAO...";
}, 1000, { immediate: false });

watch(isSiteActive, (newState) => {
  if (newState === "visible") {
    title.value = `喵咪是IQ${iq.value}！`;
    pause();
  } else {
    title.value = `理我QQ...`;
    miaomiCry.value = true;
    resume();
  }
});
// #endregion
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  place-content: center;
  height: inherit;
  > h1 {
    color: #903862;
    font-size: 1.75rem;
    text-align: center;
    margin: 0;
  }
}

.current-iq, .hairpin {
  color: rgb(var(--iq-text));
  font-size: 1.625rem;
  font-weight: bold;
  text-align: center;
  -webkit-text-stroke: 1px rgb(var(--iq-border));
}
.current-iq {
  font-size: 3.625rem;
  text-align: center;
  -webkit-text-stroke: 2px rgb(var(--iq-border));
  margin: 1.25rem 0 2rem;
}
.hairpin {
  position: absolute;
  transform: translate(-50%, -50%) rotate(-10deg);
  text-shadow:
    0 0 .125rem #fff,
    0 0 .125rem #fff,
    0 0 .125rem #fff,
    0 0 .125rem #fff,
    0 0 .125rem #fff,
    0 0 .125rem #fff,
    0 0 .125rem #fff,
    0 0 .125rem #fff,
    0 0 .125rem #fff,
    0 0 .125rem #fff;
  left: 38%;
}

.btn-holder {
  --btn-size: 15rem;
  width: var(--btn-size);
  height: var(--btn-size);
  aspect-ratio: 1;
}

.plus-iq {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: var(--btn-size);
  height: var(--btn-size);
  overflow: hidden;
  background: #e9e9ed;
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

.social-accounts {
  position: fixed;
  bottom: 1.25rem;
  right: 1rem;
}
</style>
