import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const iq = useStorage("iq", 0);

  const addIq = useDebounceFn((n: number = 1) => {
    iq.value += n;
  }, 50);

  function setIq(n: number) {
    iq.value = n;
  }

  return { iq, addIq, setIq };
});
