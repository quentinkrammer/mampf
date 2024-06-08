import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { FORM_HELPER_TEXT } from "../constants";
import { isPrice } from "../util/isPrice";
import { displayStringAsPrice } from "../util/displayStringAsPrice";
import { useState } from "react";
import { Omit } from "../types";


type MoneyTextFieldProps = Omit<TextFieldProps, 'onChange' | 'onBlur' | 'value'>
    & { price?: string, onPrice: (value: string) => void }
export function MoneyTextField({ price, onPrice, ...forwardProps }: MoneyTextFieldProps) {
    const [priceError, setPriceError] = useState(false)

    return <TextField
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
            if (!isPrice(value)) return;
            setPriceError(false);
            onPrice(value);
        }}
        onBlur={({ target: { value } }) => {
            if (value && !isPrice(value)) setPriceError(true);
            const converted = displayStringAsPrice(value) ?? '';
            onPrice(converted);
        }} {...forwardProps} />;
}
