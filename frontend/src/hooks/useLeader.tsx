import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { get } from "../fetch";
import { leaderSchema } from "../zod";

export function useLeader() {
  return useQuery({
    queryFn: async () => {
      const res = await get("users/getLeader");
      const leader = leaderSchema.parse(res?.body);
      return leader;
    },
    queryKey: [QUERY_KEYS.getLeader],
    staleTime: Infinity,
    retry: false,
  });
}
