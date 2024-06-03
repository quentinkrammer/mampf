import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../constants";
import { post } from "../fetch";

export function AuthPage() {
  const [name, setName] = useState("john");
  const [password, setPassword] = useState("123");
  const loginMutation = useLoginMutation(name, password);

  const loginIsDisabled = !name || !password;

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <TextField
        id="outlined-basic"
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
      >
        Sign In
      </Button>
    </div>
  );
}

function useLoginMutation(name: string, password: string) {
  const nagigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: () => {
      return post("auth/login", { name, password });
    },
    onSuccess: () => {
      nagigate(`/${PAGES.myOrder}`);
    },
    onError: () => {
      alert("Oopsie, sth. went wrong :(");
    },
  });

  return loginMutation;
}
