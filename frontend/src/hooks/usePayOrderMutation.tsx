import { QUERY_KEYS } from "../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { put } from "../fetch";

export function usePayOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["payOrder"],
    mutationFn: async ({
      price,
      payed,
      id,
    }: {
      price?: number;
      payed?: boolean;
      id: string;
    }) => {
      if (price && !payed) {
        return put(`orders/${id}`, { payed: true });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getAllOrders] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getMyOrders] });
    },
  });
}
