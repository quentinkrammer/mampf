import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { post } from "../fetch";

export function useFollowerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return post("users/follower", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getFollower],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getMyUserData],
      });
    },
  });
}
