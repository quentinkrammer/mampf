import { Link } from "@mui/material";
import { useMyUserData } from "../hooks/useMyUserData";
import { useLeader } from "../hooks/useLeader";
import { PaypalSvg } from "./PaypalSvg";
import { css } from "goober";

export function LeaderLink() {
  const { data: leader } = useLeader();
  const { data: myUserData } = useMyUserData();

  if (myUserData?.role === "leader" || !leader) return;
  return (
    <Link
      component={"a"}
      target="_blank"
      rel="noopener"
      href={`https://www.paypal.com/paypalme/${leader?.paypal}`}
      className={CURSOR_ON_HOVER}
      style={{ display: "flex", gap: "0.5rem" }}
    >
      <PaypalSvg />
      {leader?.name}
    </Link>
  );
}

const CURSOR_ON_HOVER = css({ "&:hover": { cursor: "alias" } });
