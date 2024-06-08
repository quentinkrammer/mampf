import { isNil } from "lodash";
import { LocalStorageKey } from "../constants";

export function readLocalStorage(key: LocalStorageKey) {
  const storage = window.localStorage;
  const jsonValue = storage.getItem(key);
  return isNil(jsonValue) ? undefined : JSON.parse(jsonValue);
}

export function setLocalStorage<T>(key: LocalStorageKey, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function deleteLocalStorage(key: LocalStorageKey) {
  window.localStorage.removeItem(key);
}
