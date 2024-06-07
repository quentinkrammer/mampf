export function isPrice(value: string) {
    const forbiddenChars = new RegExp('[^0-9,.]');
    const multipleDecimals = new RegExp('[.,].?[.,]');
    return !forbiddenChars.test(value) && !multipleDecimals.test(value);

}
