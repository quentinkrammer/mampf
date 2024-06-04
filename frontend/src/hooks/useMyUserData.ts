import { useQuery } from "@tanstack/react-query";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { get } from "../fetch";
import { readLocalStorage } from "../util/localStorage";
import { userDataSchema } from "../zod";

export function useMyUserData() {
  return useQuery({
    queryKey: ["myUserData"],
    queryFn: async () => {
      const { body } = await get("users/myUserData");
      return userDataSchema.parse(body);
    },
    enabled: !!readLocalStorage(LOCAL_STORAGE_KEYS.jwt),
    staleTime: Infinity,
  });
}
