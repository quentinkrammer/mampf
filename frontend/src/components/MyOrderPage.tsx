import { Button, CircularProgress, Dialog, DialogTitle, InputAdornment, TextField } from "@mui/material";
import { useLeader } from "../hooks/useLeader";
import { useMyOrder as useMyOrders } from "../hooks/useMyOrder";
import { MissingLeaderForm } from "./MissingLeaderForm";
import { useState } from "react";
import { FORM_HELPER_TEXT } from "../constants";
import { isPrice } from "../util/isPrice";
import { displayStringAsPrice } from "../util/displayStringAsPrice";
import { useMyOrderMutation } from "../hooks/useMyOrderMutation";
import { OrderCard } from "./OrderCard";

export function MyOrderPage() {
  const { isSuccess, isLoadingError } = useLeader();

  if (isSuccess) return <MyOrderForm />;
  if (isLoadingError) return <MissingLeaderForm />
  return <CircularProgress />;
}

function MyOrderForm() {
  const { isLoadingError, isSuccess } = useMyOrders()
  if (isSuccess) return <MyOrderOverview />
  if (isLoadingError) return <PlaceOrderForm />
  return <CircularProgress />;;
}

function MyOrderOverview() {
  const { data: orders } = useMyOrders()
  const [newOrderDialogOpenState, setNewOrderDialogOpenState] = useState(false)

  return <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', minWidth: '200px', maxWidth: '35rem' }}>
      {orders?.map((order, index) => <OrderCard order={order} header={`My order #${index + 1}`} key={order.id} sx={{ width: '100%' }} />
      )}
      <Button onClick={() => setNewOrderDialogOpenState(true)} variant="contained" style={{ alignSelf: 'flex-end' }}>
        Place new order
      </Button>

    </div>
    <Dialog onClose={() => setNewOrderDialogOpenState(false)} open={newOrderDialogOpenState}>
      <DialogTitle>Place new order</DialogTitle>
      <PlaceOrderForm onOrderPlaced={() => setNewOrderDialogOpenState(false)} />
    </Dialog>
  </div>
}

function PlaceOrderForm({ onOrderPlaced }: { onOrderPlaced?: () => void }) {
  const [details, setDetails] = useState('')
  const [detailsError, setDetailsError] = useState(false)
  const [price, setPrice] = useState('')
  const [priceError, setPriceError] = useState(false)
  const orderMutation = useMyOrderMutation(onOrderPlaced)

  return (
    <div>
      <TextField
        label="Order Details"
        variant="outlined"
        value={details}
        error={detailsError}
        helperText={detailsError && FORM_HELPER_TEXT.fieldRequired}
        required
        onChange={({ target: { value } }) => {
          setDetails(value)
          if (value) setDetailsError(false)
        }}
        onBlur={(e) => { if (!e.target.value) setDetailsError(true) }}
      />
      <TextField
        label="Price"
        variant="outlined"
        value={price}
        error={priceError}
        helperText={priceError && FORM_HELPER_TEXT.valueMustMatchNumberFormat}
        sx={{ m: 1, width: '25ch' }}
        InputProps={{
          endAdornment: <InputAdornment position="end">€</InputAdornment>,
        }}
        onChange={({ target: { value } }) => {
          if (!isPrice(value)) return
          setPriceError(false)
          setPrice(value)
        }}
        onBlur={({ target: { value } }) => {
          if (value && !isPrice(value)) setPriceError(true)
          const converted = displayStringAsPrice(value) ?? ''
          setPrice(converted)
        }}
      />
      <Button onClick={() => orderMutation.mutate({ details, price })} disabled={!details}>
        Place Order
      </Button>
    </div>)
}



