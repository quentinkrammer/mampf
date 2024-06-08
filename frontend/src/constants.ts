export const PAGES = {
  auth: "auth",
  myOrder: "myOrder",
  allOrders: "allOrders",
  shopTeam: "shopTeam"
} as const;
export type Pages = (typeof PAGES)[keyof typeof PAGES];

export const LOCAL_STORAGE_KEYS = { jwt: "JWT" } as const;
export type LocalStorageKey =
  (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

export const QUERY_KEYS = {
  getMyUserData: "getMyUserData",
  getLeader: "getLeader",
  getMyOrders: "getMyOrders",
  getAllOrders: "getAllOrders"
};

export const FORM_HELPER_TEXT = {
  fieldRequired: 'Field required',
  valueMustMatchNumberFormat: 'Value must match number format'
}
