import { Button, CircularProgress, InputAdornment, TextField } from "@mui/material";
import { useLeader } from "../hooks/useLeader";
import { useMyOrder } from "../hooks/useMyOrder";
import { MissingLeaderForm } from "./MissingLeaderForm";
import { useState } from "react";
import { FORM_HELPER_TEXT } from "../constants";
import { isPrice } from "../util/isPrice";
import { displayStringAsPrice } from "../util/displayStringAsPrice";
import { useMyOrderMutation } from "../hooks/useMyOrderMutation";

export function MyOrderPage() {
  const { isSuccess, isLoadingError } = useLeader();

  if (isSuccess) return <MyOrderForm />;
  if (isLoadingError) return <MissingLeaderForm />
  return <CircularProgress />;
}

function MyOrderForm() {
  const { data, isLoadingError, isSuccess } = useMyOrder()

  if (isSuccess) return "success";
  if (isLoadingError) return <InitialOrderForm />
  return <CircularProgress />;;
}


function InitialOrderForm() {
  const [details, setDetails] = useState('')
  const [detailsError, setDetailsError] = useState(false)
  const [price, setPrice] = useState('')
  const [priceError, setPriceError] = useState(false)
  const orderMutation = useMyOrderMutation()

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



