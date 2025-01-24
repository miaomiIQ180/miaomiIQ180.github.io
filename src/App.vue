<template>
  <div class="container" :class="{ naughty: !noNaughty }">
    <header id="app-header">
      <h1>喵咪總IQ是</h1>
      <p class="global-iq">IQ{{ globalIq }}</p>
      <p class="local-iq">
        <span>你為喵咪增加了</span>
        <span class="local-iq__value">{{ iq }}</span>
        <span>點IQ</span>
      </p>
    </header>

    <main id="app-main">
      <ButtonArea @iq-added="handleBtnClick" />
      <PawCheckbox v-model="noNaughty" class="no-naughty" text="聽話！讓我按按！" />
    </main>

    <footer id="app-footer">
      <FooterBar />
    </footer>
    <PlusOne ref="plusOne" />
  </div>
  <LoadingShade :show="isLoading > 0" />
</template>

<script setup lang="ts">
import type PlusOne from "./components/PlusOne.vue";

const { isLoading, iq, noNaughty, globalIq, globalIqSync } = storeToRefs(useAppStore());
const { setLoading } = useAppStore();
const { x: mouseX, y: mouseY } = useMouse();

// #region : Set title on load
const title = useTitle();
watch(iq, (newIq) => {
  // FIXME: Cursor reset problem
  title.value = `喵咪現在IQ${newIq}！`;
}, { immediate: true });
// #endregion

// #region : Button click
const plusOne = useTemplateRef<InstanceType<typeof PlusOne>>("plusOne");
function handleBtnClick() {
  plusOne.value?.add(iq.value, mouseX.value, mouseY.value);
}
// #endregion

// #region : Trace IQ value from firebase
const { resume: startTraceIq, pause: pauseTraceIq } = useIntervalFn(() => {
  if (globalIqSync.value) {
    globalIq.value = globalIqSync.value;
  }
}, 3000, { immediate: false, immediateCallback: true });

onBeforeMount(async () => {
  await until(globalIqSync).toBeTruthy({ timeout: 5000, throwOnTimeout: true });
  globalIq.value = globalIqSync.value!;
  startTraceIq();
  setLoading(false);
});
// #endregion

// #region : Handle site not active
const isSiteActive = useDocumentVisibility();
const { pause: miaomiStopCry, resume: miaomiCry } = useIntervalFn(() => {
  title.value = title.value === "OAO..." ? `理我QQ...` : "OAO...";
}, 1000, { immediate: false });

watch(isSiteActive, (newState) => {
  if (newState === "visible") {
    title.value = `喵咪現在IQ${iq.value}！`;
    miaomiStopCry();
    startTraceIq();
  } else {
    title.value = `理我QQ...`;
    miaomiCry();
    pauseTraceIq();
  }
});
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
  h1 {
    color: #903862;
    font-size: 1.75rem;
    text-align: center;
    font-weight: 500;
    margin: 0;
  }
  > main {
    text-align: center;
    width: 100%;
    transition: flex .3s ease
  }
}

.global-iq, :deep(.hairpin) {
  color: rgb(var(--iq-text));
  font-weight: bold;
  text-align: center;
  line-height: 1;
  -webkit-text-stroke: 1px rgb(var(--iq-border));
}
.global-iq {
  font-size: 3.625rem;
  text-align: center;
  -webkit-text-stroke: 2px rgb(var(--iq-border));
  margin: .5rem 0;
}
.local-iq {
  font-size: 1.125rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0 0 1rem;
  &__value {
    color: #903862;
    font-size: 1.625em;
    font-weight: bold;
    margin: 0 .25rem;
  }
}

main {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.button-area {
  z-index: 2;
}

.no-naughty {
  font-size: 1.25rem;
  margin-top: 1.5rem;
}

.footer-bar {
  margin-top: 1rem;
}

.container.naughty {
  padding: 2rem 1rem 1.5rem;
  :is(#app-main, .button-area) {
    flex-grow: 1;
  }
}
</style>
