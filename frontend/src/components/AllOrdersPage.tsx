import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAllOrders } from "../hooks/useAllOrders";
import { OrderCard } from "./OrderCard";
import { useState } from "react";
import { MoneyTextField } from "./MoneyTextField";
import { useEditPriceMutation } from "../hooks/useEditPriceMutation";

export function AllOrdersPage() {
  const { data: orders } = useAllOrders();
  const [editOrderId, setEditOrderId] = useState("");

  return (
    <>
      <div
        style={{
          display: "grid",
          gap: "0.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {orders?.map((order) => (
          <OrderCard
            order={order}
            header={order.username ?? "Unknown"}
            onEditPrice={(order) => setEditOrderId(order.id)}
            key={order.id}
          />
        ))}
      </div>
      <Dialog onClose={() => setEditOrderId("")} open={!!editOrderId}>
        <DialogTitle>Edit Price</DialogTitle>
        {!!editOrderId && (
          <EditPriceForm
            orderId={editOrderId}
            onClose={() => setEditOrderId("")}
          />
        )}
      </Dialog>
    </>
  );
}

type EditPriceFormProps = { orderId: string; onClose?: () => void };
function EditPriceForm({ orderId, onClose }: EditPriceFormProps) {
  const orderMutation = useEditPriceMutation(onClose);
  const [price, setPrice] = useState("");

  return (
    <DialogContent
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        paddingTop: "1rem",
      }}
    >
      <MoneyTextField onPrice={(e) => setPrice(e)} price={price} />
      <Button
        onClick={() => orderMutation.mutate({ orderId, price })}
        disabled={!price}
        style={{ alignSelf: "end" }}
        variant="contained"
      >
        Save
      </Button>
    </DialogContent>
  );
}
