import { useAllOrders } from "../hooks/useAllOrders";
import { OrderCard } from "./OrderCard";

export function AllOrdersPage() {
  const { data: orders } = useAllOrders()

  return (
    <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
      {orders?.map((order) => <OrderCard order={order} header={order.username ?? 'Unknown'} key={order.id} />
      )}
    </div>
  );
}

