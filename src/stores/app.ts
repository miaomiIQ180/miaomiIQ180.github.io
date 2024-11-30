import kirby1up from "@/assets/sound/kirby-1up.mp3";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const iq = useStorage("iq", 0);

  const { play: play1up } = useSound(kirby1up);
  const addIq = useDebounceFn((n: number = 1) => {
    play1up();
    iq.value += n;
  }, 50);

  function setIq(n: number) {
    iq.value = n;
  }

  return { iq, addIq, setIq };
});
