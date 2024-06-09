import { QUERY_KEYS } from "../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { put } from "../fetch";
import { isFinite } from "lodash";
import { displayStringAsPrice } from "../util/displayStringAsPrice";

export function useEditPriceMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editOrderPrice"],
    mutationFn: ({ orderId, price }: { orderId: string; price: string }) => {
      const priceFloat = parseFloat(displayStringAsPrice(`${price}`) ?? "");
      if (!isFinite(priceFloat))
        throw new Error(
          `Form Validation Client Error. Price "${price} cant be parsed to float`,
        );
      return put(`orders/editPrice/${orderId}`, { price: priceFloat });
    },
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getAllOrders] });
    },
  });
}
