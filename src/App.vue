<template>
  <div class="container">
    <h1>喵咪現在是</h1>
    <p class="current-iq">IQ{{ iq }}</p>
    <SocialAccounts />
    <ButtonArea @iq-added="plusOne?.add(iq, mouseX, mouseY)" />
    <PlusOne ref="plusOne" />
  </div>
</template>

<script setup lang="ts">
import type PlusOne from "./components/PlusOne.vue";

const { iq } = storeToRefs(useAppStore());
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

// #region : +1 indicator
const plusOne = useTemplateRef<InstanceType<typeof PlusOne>>("plusOne");
// #endregion
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: inherit;
  padding: 1rem 1.5rem;
  > h1 {
    color: #903862;
    font-size: 1.75rem;
    text-align: center;
    margin: 0;
  }
}

.current-iq, :deep(.hairpin) {
  color: rgb(var(--iq-text));
  font-size: 1.625rem;
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

.social-accounts {
  position: fixed;
  bottom: 1.5rem;
  right: 1rem;
}
</style>
