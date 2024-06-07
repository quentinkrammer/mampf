import { useQuery } from "@tanstack/react-query";
import { get } from "../fetch";
import { orderSchema } from "../zod";
import { QUERY_KEYS } from "../constants";

export function useMyOrder() {
    return useQuery({
        queryKey: [QUERY_KEYS.getMyOrder],
        queryFn: async () => {
            const res = await get('orders/getMyOrder');
            return orderSchema.parse(res?.body);
        },
        staleTime: Infinity,
        retry: false,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
}
