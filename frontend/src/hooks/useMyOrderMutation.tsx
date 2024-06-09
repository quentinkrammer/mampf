import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isFinite } from "lodash";
import { QUERY_KEYS } from "../constants";
import { post } from "../fetch";
import { displayStringAsPrice } from "../util/displayStringAsPrice";
import { postOrderSchema } from "../zod";

export function useMyOrderMutation(onOrderPlaced?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["postMyOrders"],
    mutationFn: ({ details, price }: { details: string; price?: string }) => {
      const priceFloat = parseFloat(displayStringAsPrice(price) ?? "");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const reqBody: any = { details };
      if (isFinite(priceFloat)) {
        reqBody.price = priceFloat;
      }
      const parsed = postOrderSchema.parse(reqBody);
      return post("orders", parsed);
    },
    onSuccess: () => {
      onOrderPlaced?.();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getMyOrders] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getAllOrders] });
    },
  });
}
