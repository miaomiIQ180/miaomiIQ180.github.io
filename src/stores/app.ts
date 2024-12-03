import kirby1up from "@/assets/sound/kirby-1up.mp3";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  // #region : Settings
  const playSound = useStorage("playSound", true);
  const noNaughty = useStorage("noNaughty", false);
  // #endregion

  // #region : IQ
  const iq = useStorage("iq", 0);

  const { play: play1up } = useSound(kirby1up);
  const addIq = useDebounceFn((n: number = 1) => {
    if (playSound.value) {
      play1up();
    }
    iq.value += n;
  }, 50);

  function setIq(n: number) {
    iq.value = n;
  }
  // #endregion

  return { playSound, noNaughty, iq, addIq, setIq };
});
