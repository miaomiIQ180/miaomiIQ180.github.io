<template>
  <div class="container" :class="{ naughty: !noNaughty }">
    <h1>喵咪現在是</h1>
    <p class="current-iq">IQ{{ iq }}</p>
    <ButtonArea @iq-added="handleBtnClick" />
    <PawCheckbox v-model="noNaughty" class="no-naughty" text="聽話！讓我按按！" />
    <FooterBar />
    <PlusOne ref="plusOne" />
  </div>
</template>

<script setup lang="ts">
import type PlusOne from "./components/PlusOne.vue";

const { iq, noNaughty } = storeToRefs(useAppStore());
const { x: mouseX, y: mouseY } = useMouse();

// #region : Set title on load
const title = useTitle();
watch(iq, (newIq) => {
  // FIXME: Cursor reset problem
  title.value = `喵咪現在IQ${newIq}！`;
}, { immediate: true });
// #endregion

// #region : Handle site not active
const isSiteActive = useDocumentVisibility();
const { pause, resume } = useIntervalFn(() => {
  title.value = title.value === "OAO..." ? `理我QQ...` : "OAO...";
}, 1000, { immediate: false });

watch(isSiteActive, (newState) => {
  if (newState === "visible") {
    title.value = `喵咪現在IQ${iq.value}！`;
    pause();
  } else {
    title.value = `理我QQ...`;
    resume();
  }
});
// #endregion

// #region : Button click
const plusOne = useTemplateRef<InstanceType<typeof PlusOne>>("plusOne");
function handleBtnClick() {
  plusOne.value?.add(iq.value, mouseX.value, mouseY.value);
}
// #endregion
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: inherit;
  padding: 1.5rem;
  > h1 {
    color: #903862;
    font-size: 1.75rem;
    text-align: center;
    margin: 0;
  }
}

.current-iq, :deep(.hairpin) {
  color: rgb(var(--iq-text));
  font-weight: bold;
  text-align: center;
  line-height: 1;
  -webkit-text-stroke: 1px rgb(var(--iq-border));
}
.current-iq {
  font-size: 3.625rem;
  text-align: center;
  -webkit-text-stroke: 2px rgb(var(--iq-border));
  margin: 1.5rem 0 2rem;
}

.button-area {
  z-index: 2;
}

.no-naughty {
  font-size: 1.25rem;
  margin-top: 1.5rem;
}

.footer-bar {
  // position: fixed;
  // bottom: 1.25rem;
  // right: 1rem;
  margin-top: 1rem;
}

.container.naughty {
  padding: 2rem 1rem 1.5rem;
  .button-area {
    flex-grow: 1;
  }
}
</style>
