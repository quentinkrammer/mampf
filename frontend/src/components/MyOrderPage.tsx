import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { useLeader } from "../hooks/useLeader";
import { useMyOrder } from "../hooks/useMyOrder";
import { MissingLeaderForm } from "./MissingLeaderForm";
import { useState } from "react";
import { FORM_HELPER_TEXT } from "../constants";

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
    </div>)
}



function isPrice(value: string) {
  const forbiddenChars = new RegExp('[^0-9,.]')
  const multipleDecimals = new RegExp('[.,].?[.,]')
  return !forbiddenChars.test(value) && !multipleDecimals.test(value)

}

function displayStringAsPrice(value: string) {
  if (!isPrice(value) || !value) return
  const decimalRegex = new RegExp('[,.]')
  const decimalIndex = value.search(decimalRegex)
  if (decimalIndex === -1) {
    return `${value}.00`
  }
  const wholeNumber = value.substring(0, decimalIndex).padStart(1, '0')
  const fraction = value.substring(decimalIndex + 1, decimalIndex + 3).padEnd(2, '0')
  return `${wholeNumber}.${fraction}`
}