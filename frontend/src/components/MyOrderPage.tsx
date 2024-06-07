import { Button, Card, CardContent, CircularProgress, Dialog, DialogTitle, Icon, InputAdornment, Switch, TextField, Typography } from "@mui/material";
import { useLeader } from "../hooks/useLeader";
import { useMyOrder } from "../hooks/useMyOrder";
import { MissingLeaderForm } from "./MissingLeaderForm";
import { useState } from "react";
import { FORM_HELPER_TEXT } from "../constants";
import { isPrice } from "../util/isPrice";
import { displayStringAsPrice } from "../util/displayStringAsPrice";
import { useMyOrderMutation } from "../hooks/useMyOrderMutation";
import { useMyUserData } from "../hooks/useMyUserData";
import { green, red } from '@mui/material/colors';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { usePayOrderMutation } from "../hooks/usePayOrderMutation";

export function MyOrderPage() {
  const { isSuccess, isLoadingError } = useLeader();

  if (isSuccess) return <MyOrderForm />;
  if (isLoadingError) return <MissingLeaderForm />
  return <CircularProgress />;
}

function MyOrderForm() {
  const { isLoadingError, isSuccess } = useMyOrder()

  if (isSuccess) return <MyOrderOverview />
  if (isLoadingError) return <PlaceOrderForm />
  return <CircularProgress />;;
}

function MyOrderOverview() {
  const { data: orders } = useMyOrder()
  const { data: userData } = useMyUserData()
  const [newOrderDialogOpenState, setNewOrderDialogOpenState] = useState(false)
  const payOrderMutation = usePayOrderMutation()

  return <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', minWidth: '200px', maxWidth: '35rem' }}>
      {orders?.map((order) => {
        const displayPayorderButton = !order.payed && order.price
        return <Card raised sx={{ width: '100%' }} key={order.id}>
          <CardContent >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
                My Order
              </Typography>
              <OrderPayedIcon payed={order.payed} />
            </div>
            <Typography variant="h5" component="div">
              {order?.details}
            </Typography>
            <div style={{ justifyContent: 'space-between', display: 'flex', gap: '2rem', paddingTop: '0.3rem' }}>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {`Price: ${order?.price || 'N/A'} €`}
              </Typography>
              {displayPayorderButton && <Button onClick={() => payOrderMutation.mutate(order)} variant="contained" >
                Mark as payed
              </Button>}
            </div>
          </CardContent>
        </Card>
      }
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

function OrderPayedIcon({ payed }: { payed?: boolean }) {

  if (payed) return <PriceCheckIcon color={'success'} titleAccess={'Order has been payed already'} />
  return <ErrorOutlineIcon color="error" titleAccess="This order still needs to be payed for" />
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



