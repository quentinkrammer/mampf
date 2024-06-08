import { useQuery } from "@tanstack/react-query";
import { get } from "../fetch";
import { orderSchema } from "../zod";
import { QUERY_KEYS } from "../constants";
import { z } from "zod";

export function useAllOrders() {
    return useQuery({
        queryKey: [QUERY_KEYS.getAllOrders],
        queryFn: async () => {
            const res = await get('orders/getAllOrders');
            return z.array(orderSchema).parse(res?.body);
        },
        staleTime: 60000,
        retry: false,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
}
