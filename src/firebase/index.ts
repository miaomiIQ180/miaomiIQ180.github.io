import { initializeApp } from "firebase/app";
import { ref as dbRef, getDatabase, update } from "firebase/database";
import { useDatabaseObject } from "vuefire";

export const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
});

interface typeAppData {
  id: "app",
  iq: number,
}

// used for the databas refs
const db = getDatabase(firebaseApp);
export function useAppDbRef() {
  return dbRef(db, "app");
}
export function useAppDbData() {
  return useDatabaseObject<typeAppData>(useAppDbRef());
}
export function getIq() {
  return computed(() => useAppDbData().value?.iq);
}
export function updateIq() {
  const appRef = useAppDbRef();
  const iq = getIq();
  if (!iq.value) {
    return;
  }

  return update(appRef, { iq: iq.value + 1 });
}
