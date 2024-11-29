import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const iq = useStorage("iq", 0);

  function addIq(n: number = 1) {
    iq.value += n;
  }

  function setIq(n: number) {
    iq.value = n;
  }

  return { iq, addIq, setIq };
});
