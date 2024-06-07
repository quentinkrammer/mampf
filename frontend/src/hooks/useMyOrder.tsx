import { useQuery } from "@tanstack/react-query";
import { get } from "../fetch";
import { orderSchema } from "../zod";
import { QUERY_KEYS } from "../constants";
import { z } from "zod";

export function useMyOrder() {
    return useQuery({
        queryKey: [QUERY_KEYS.getMyOrders],
        queryFn: async () => {
            const res = await get('orders/getMyOrders');
            return z.array(orderSchema).parse(res?.body);
        },
        staleTime: Infinity,
        retry: false,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
}
