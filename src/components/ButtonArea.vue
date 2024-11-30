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
</template>

<script setup lang="ts">
const emit = defineEmits<{
  iqAdded: [],
}>();

// #region : Load image
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
const { iq } = storeToRefs(useAppStore());
const { addIq } = useAppStore();
const plusIqBtn = ref<HTMLButtonElement | null>(null);
const { vibrate } = useVibrate({ pattern: 100 });
const { pressed: isPressed } = useMousePressed({ target: plusIqBtn });
watch(isPressed, (newVal) => {
  if (newVal) {
    vibrate();
    miaomiCry.value = false;
  } else {
    addIq();
    emit("iqAdded");
  }
});
// #endregion
</script>

<style lang="scss" scoped>
.button-area {
  --btn-size: 15rem;
  text-align: center;
  width: 100%;
  height: var(--btn-size);
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
    user-select: none;
  }
  &:hover {
    background: rgb(var(--color-theme4));
  }
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

.button-area {
  &.pressing {
    .plus-iq {
      padding-top: 1rem;
    }
  }
}
</style>
