import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useLeader } from "../hooks/useLeader";
import { useMyOrder as useMyOrders } from "../hooks/useMyOrder";
import { MissingLeaderForm } from "./MissingLeaderForm";
import { useState } from "react";
import { FORM_HELPER_TEXT } from "../constants";
import { useMyOrderMutation } from "../hooks/useMyOrderMutation";
import { OrderCard } from "./OrderCard";
import { MoneyTextField } from "./MoneyTextField";

export function MyOrderPage() {
  const { isSuccess, isLoadingError } = useLeader();

  if (isSuccess) return <MyOrderForm />;
  if (isLoadingError) return <MissingLeaderForm />;
  return <CircularProgress />;
}

function MyOrderForm() {
  const { isLoadingError, isSuccess } = useMyOrders();
  if (isSuccess) return <MyOrderOverview />;
  if (isLoadingError) return <PlaceOrderForm />;
  return <CircularProgress />;
}

function MyOrderOverview() {
  const { data: orders } = useMyOrders();
  const [newOrderDialogOpenState, setNewOrderDialogOpenState] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          minWidth: "200px",
          maxWidth: "35rem",
        }}
      >
        {orders?.map((order, index) => (
          <OrderCard
            order={order}
            header={`My order #${index + 1}`}
            key={order.id}
            sx={{ width: "100%" }}
          />
        ))}
        <Button
          onClick={() => setNewOrderDialogOpenState(true)}
          variant="contained"
          style={{ alignSelf: "flex-end" }}
        >
          Place new order
        </Button>
      </div>
      <Dialog
        onClose={() => setNewOrderDialogOpenState(false)}
        open={newOrderDialogOpenState}
      >
        <DialogTitle>Place new order</DialogTitle>
        <DialogContent style={{ paddingTop: "1rem" }}>
          <PlaceOrderForm
            onOrderPlaced={() => setNewOrderDialogOpenState(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PlaceOrderForm({ onOrderPlaced }: { onOrderPlaced?: () => void }) {
  const [details, setDetails] = useState("");
  const [detailsError, setDetailsError] = useState(false);
  const [price, setPrice] = useState("");
  const orderMutation = useMyOrderMutation(onOrderPlaced);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "35rem",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <TextField
        label="Order Details"
        variant="outlined"
        value={details}
        error={detailsError}
        helperText={detailsError && FORM_HELPER_TEXT.fieldRequired}
        required
        onChange={({ target: { value } }) => {
          setDetails(value);
          if (value) setDetailsError(false);
        }}
        onBlur={(e) => {
          if (!e.target.value) setDetailsError(true);
        }}
      />
      <MoneyTextField onPrice={setPrice} price={price} />
      <Button
        onClick={() => orderMutation.mutate({ details, price })}
        disabled={!details}
        style={{ alignSelf: "end" }}
        variant="contained"
      >
        Place Order
      </Button>
    </div>
  );
}
