import { useQuery } from "@tanstack/react-query";
import { LOCAL_STORAGE_KEYS, QUERY_KEYS } from "../constants";
import { get } from "../fetch";
import { readLocalStorage } from "../util/localStorage";
import { userDataSchema } from "../zod";

export function useMyUserData() {
  return useQuery({
    queryKey: [QUERY_KEYS.getMyUserData],
    queryFn: async () => {
      const jwt = readLocalStorage(LOCAL_STORAGE_KEYS.jwt);
      if (!jwt) throw Error("Cannot fetch UserData until authenticated");
      const res = await get("users/getMyUserData");
      return userDataSchema.parse(res?.body);
    },
    staleTime: Infinity,
    retry: false,
  });
}
