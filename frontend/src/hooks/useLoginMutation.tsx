import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEYS, PAGES, QUERY_KEYS } from "../constants";
import { post, requestHeaders } from "../fetch";
import { setLocalStorage } from "../util/localStorage";
import { accessTokenSchema } from "../zod";

export function useLoginMutation(name: string, password: string) {
  const nagigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: () => {
      return post("auth/login", { name, password });
    },
    onSuccess: (res) => {
      const { access_token: jwt } = accessTokenSchema.parse(res?.body);
      setLocalStorage(LOCAL_STORAGE_KEYS.jwt, jwt);
      requestHeaders.set("Authorization", `Bearer ${jwt}`);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getMyUserData] });
      nagigate(`/${PAGES.myOrder}`);
    },
    onError: () => {
      alert("Oopsie, sth. went wrong :(");
    },
  });

  return loginMutation;
}
