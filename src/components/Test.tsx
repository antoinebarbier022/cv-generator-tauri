import { Input } from "@mui/joy";
import { useState } from "react";

export const Test = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          window.sessionStorage.setItem("profile.name", e.target.value);
        }}
      />
    </>
  );
};
