import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLoginMutation } from "../hooks/useLoginMutation";

export function AuthPage() {
  const [name, setName] = useState("john");
  const [password, setPassword] = useState("123");
  const loginMutation = useLoginMutation(name, password);

  const loginIsDisabled = !name || !password;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "35rem",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <TextField
        label="Username"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <TextField
        label="Password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button
        variant="contained"
        disabled={loginIsDisabled}
        onClick={() => {
          loginMutation.mutate();
        }}
        style={{ alignSelf: "end" }}
      >
        Sign In
      </Button>
    </div>
  );
}
