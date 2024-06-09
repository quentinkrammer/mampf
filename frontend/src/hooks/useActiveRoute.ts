import { useLocation } from "react-router-dom";
import { PAGES, type Pages } from "../constants";
import { assertUnreachable } from "../util/assertUnreachable";

export function useActiveRoute() {
  const { pathname } = useLocation();
  const domain = pathname.split("/")[1] as Pages | undefined;
  if (!domain) return;
  switch (domain) {
    case PAGES.auth:
      return PAGES.auth;
    case PAGES.myOrder:
      return PAGES.myOrder;
    case PAGES.shopTeam:
      return PAGES.shopTeam;
    case PAGES.allOrders:
      return PAGES.allOrders;
    default:
      assertUnreachable(domain);
  }
}
