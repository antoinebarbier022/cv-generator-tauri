import { Input } from "@mui/joy";
import { ChangeEventHandler, FocusEventHandler } from "react";

interface Props {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
}
export const Test2 = (props: Props) => {
  return (
    <>
      <Input
        name={props.name}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </>
  );
};
