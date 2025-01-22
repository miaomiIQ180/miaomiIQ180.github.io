import kirby1up from "@/assets/sound/kirby-1up.mp3";
import { getIq, updateIq } from "@/firebase";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  // #region : Settings
  const playSound = useStorage("playSound", true);
  const vibrateOnClick = useStorage("vibrateOnClick", true);
  const noNaughty = useStorage("noNaughty", false);
  // #endregion

  // #region : Global IQ
  const globalIq = ref<number>(0);
  const globalIqSync = getIq();
  const addGlobalIq = useDebounceFn(updateIq, 50, { maxWait: 100 });
  // #endregion

  // #region : IQ
  const iq = useStorage("iq", 0);

  const { play: play1up } = useSound(kirby1up);
  const addIq = useDebounceFn((n: number = 1) => {
    if (playSound.value) {
      play1up();
    }
    iq.value += n;
    globalIq.value += n;
  }, 50, { maxWait: 100 });

  function setIq(n: number) {
    iq.value = n;
  }
  // #endregion

  return {
    playSound,
    vibrateOnClick,
    noNaughty,
    iq,
    addIq,
    setIq,
    globalIq,
    globalIqSync,
    addGlobalIq,
  };
});
