import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const iq = useStorage("iq", 0);

  return { iq };
});
