import { QUERY_KEYS } from "../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOrderSchema } from "../zod";
import { post } from "../fetch";
import { isFinite } from "lodash";
import { displayStringAsPrice } from "../util/displayStringAsPrice";

export function useMyOrderMutation() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['postMyOrder'],
        mutationFn: ({ details, price }: { details: string; price?: string; }) => {
            const priceFloat = parseFloat(displayStringAsPrice(price) ?? '');
            const reqBody: any = { details };
            if (isFinite(priceFloat)) {
                reqBody.price = priceFloat;
            }
            const parsed = postOrderSchema.parse(reqBody);
            return post('orders', parsed);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getMyOrder] });
        }
    });
}
