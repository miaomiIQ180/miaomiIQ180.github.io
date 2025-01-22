<template>
  <div
    ref="btnArea"
    class="button-area"
    :class="{ pressing: isPressed }"
    :style="{ '--btn-size': btnPara.size }"
  >
    <button
      ref="plusIqBtn"
      type="button"
      class="plus-iq"
      :style="{
        top: btnPara.top,
        left: btnPara.left,
      }"
    >
      <template v-if="miaomiCry">
        <img
          v-show="!isPressed"
          src="/img/miaomi_cry_300.webp"
          alt="Miaomi cried"
          @contextmenu.prevent=""
          @contextmenu.stop=""
        >
      </template>
      <template v-else-if="isCryImgReady && isNormalImgReady && isPressedImgReady">
        <img
          v-show="!isPressed"
          src="/img/miaomi_normal_300.webp"
          alt="Miaomi"
          @contextmenu.prevent=""
          @contextmenu.stop=""
        >
        <img
          v-show="isPressed"
          src="/img/miaomi_pressed_300.webp"
          alt="Miaomi pressed"
          @contextmenu.prevent=""
          @contextmenu.stop=""
        >
      </template>
      <div class="hairpin">IQ{{ iq }}</div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { rem2px } from "@/utils/function";
import random from "random-int";

const emit = defineEmits<{
  iqAdded: [],
}>();

// #region : Load image
const { isReady: isCryImgReady } = useImage({ src: "/img/miaomi_cry_300.webp" });
const { isReady: isNormalImgReady } = useImage({ src: "/img/miaomi_normal_300.webp" });
const { isReady: isPressedImgReady } = useImage({ src: "/img/miaomi_pressed_300.webp" });
// #endregion

// #region : When inactive
const miaomiCry = ref(false);
const isSiteActive = useDocumentVisibility();

whenever(() => isSiteActive.value === "hidden", () => {
  miaomiCry.value = true;
});
// #endregion

// #region : Button function
const { iq, vibrateOnClick, noNaughty } = storeToRefs(useAppStore());
const { addIq, addGlobalIq } = useAppStore();
const plusIqBtn = ref<HTMLButtonElement | null>(null);
const { vibrate } = useVibrate({ pattern: 100 });
const { pressed: isPressed } = useMousePressed({ target: plusIqBtn });
watch(isPressed, (newVal) => {
  if (newVal) {
    if (vibrateOnClick.value) {
      vibrate();
    }
    miaomiCry.value = false;
  } else {
    console.log("add IQ");
    addIq();
    addGlobalIq();
    emit("iqAdded");
    if (!noNaughty.value) {
      getMoving();
    }
  }
});

const btnArea = ref<HTMLElement | null>(null);
const btnAreaSize = useElementSize(btnArea);
const btnPara = shallowRef<Record<string, string | undefined>>({
  size: undefined,
  top: undefined,
  left: undefined,
});
function resetBtnPara() {
  btnPara.value = {
    size: undefined,
    top: undefined,
    left: undefined,
  };
}
async function getMoving() {
  if (!btnArea.value) {
    return;
  }
  const size = random(75, 150);
  const sizePx = rem2px(size) / 10;
  const top = `${random(0, btnAreaSize.height.value - sizePx)}px`;
  const left = `${random(0, btnAreaSize.width.value - sizePx)}px`;
  btnPara.value = {
    size: `${size / 10}rem`,
    top,
    left,
  };
}

watch(noNaughty, resetBtnPara);
onMounted(() => {
  useEventListener("resize", useDebounceFn(resetBtnPara, 250), { passive: true });
});
// #endregion
</script>

<style lang="scss" scoped>
.button-area {
  --btn-size: 15rem;
  line-height: 1;
  text-align: center;
  position: relative;
  width: 100%;
  height: var(--btn-size);
  transition: flex .3s ease;
}

.plus-iq {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(50% - var(--btn-size) / 2);
  left: calc(50% - var(--btn-size) / 2);
  width: var(--btn-size);
  width: clamp(7.5rem, var(--btn-size), 15rem);
  height: var(--btn-size);
  height: clamp(7.5rem, var(--btn-size), 15rem);
  aspect-ratio: 1;
  overflow: hidden;
  background: #e9e9ed;
  border: none;
  border-radius: var(--btn-size);
  padding: 0;
  transition: all .15s ease;
  img {
    -webkit-user-select: none;
    user-select: none;
    pointer-events: none;
    -webkit-touch-callout: none;
  }
  &:hover {
    background: rgb(var(--color-theme4));
  }
}

.naughty .plus-iq {
  position: absolute;
  top: calc(50% - var(--btn-size) / 2);
  left: calc(50% - var(--btn-size) / 2);
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
  font-size: calc(var(--btn-size) * 0.11);
  -webkit-user-select: none;
  user-select: none;
  pointer-events: none;
}

.button-area {
  &.pressing {
    .plus-iq {
      padding-top: 1rem;
    }
  }
}
</style>
