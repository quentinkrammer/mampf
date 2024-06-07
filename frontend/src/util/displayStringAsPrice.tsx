import { isPrice } from "./isPrice";

export function displayStringAsPrice(value?: string) {
    if (!value || !isPrice(value)) return;
    const decimalRegex = new RegExp('[,.]');
    const decimalIndex = value.search(decimalRegex);
    if (decimalIndex === -1) {
        return `${value}.00`;
    }
    const wholeNumber = value.substring(0, decimalIndex).padStart(1, '0');
    const fraction = value.substring(decimalIndex + 1, decimalIndex + 3).padEnd(2, '0');
    return `${wholeNumber}.${fraction}`;
}
