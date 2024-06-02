export const PAGES = {
  root: "/",
  auth: "auth",
  myOrder: "myOrder",
} as const;

export const LOCAL_STORAGE_KEYS = { jwt: "JWT" } as const;
export type LocalStorageKey =
  (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];
