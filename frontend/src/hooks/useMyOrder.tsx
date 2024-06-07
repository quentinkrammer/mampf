import { useQuery } from "@tanstack/react-query";
import { get } from "../fetch";
import { orderSchema } from "../zod";

export function useMyOrder() {
    return useQuery({
        queryKey: ['getMyOrder'],
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
