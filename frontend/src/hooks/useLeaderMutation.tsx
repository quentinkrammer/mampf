import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants";
import { post } from "../fetch";

export function useLeaderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ paypal }: { paypal?: string }) => {
      const reqBody = paypal ? { paypal } : {};
      return post("users/leader", reqBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getLeader, QUERY_KEYS.getMyUserData],
      });
    },
  });
}
