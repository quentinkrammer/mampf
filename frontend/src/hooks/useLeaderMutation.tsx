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
      // Why the fuck cant I simply pass both querry keys in a single list
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getLeader],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getMyUserData],
      });
    },
  });
}
