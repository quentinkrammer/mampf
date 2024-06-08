import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { get } from "../fetch";
import {
  followerSchema
} from "../zod";
import { z } from "zod";

export function useFollower() {
  return useQuery({
    queryFn: async () => {
      const res = await get("users/getFollower");
      const follower = z.array(followerSchema).parse(res?.body);
      return follower;
    },
    queryKey: [QUERY_KEYS.getFollower],
    staleTime: Infinity,
    retry: false,
  });
}
