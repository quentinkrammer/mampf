import { useQuery } from "@tanstack/react-query";
import { get } from "../fetch";
import { userDataSchema } from "../zod";

export function useMyUserData() {
  return useQuery({
    queryKey: ["myUserData"],
    queryFn: async () => {
      const { body } = await get("users/myUserData");
      return userDataSchema.parse(body);
    },
  });
}
