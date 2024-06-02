import { ComponentProps, useId } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  required?: boolean;
};
export function Input({ label, required, ...forwardProps }: InputProps) {
  const id = useId();

  return (
    <div>
      <fieldset style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor={id}>{`${label}${required ? "*" : ""}`}</label>
        <input type="input" id={id} {...forwardProps} />
      </fieldset>
    </div>
  );
}
