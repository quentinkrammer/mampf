import { useMyUserData } from "../hooks/useMyUserData";

export function MyOrderPage() {
  const { data } = useMyUserData();

  return JSON.stringify(data);
}
