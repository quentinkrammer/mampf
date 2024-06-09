import {
  Button,
  Card,
  CardContent,
  CardProps,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { Order } from "../zod";
import { useMyUserData } from "../hooks/useMyUserData";
import { usePayOrderMutation } from "../hooks/usePayOrderMutation";

interface OrderCardProps extends CardProps {
  order: Order;
  header: string;
  onEditPrice?: (order: Order) => void;
}
export function OrderCard({
  order,
  header,
  onEditPrice,
  ...forwardProps
}: OrderCardProps) {
  const { data: user } = useMyUserData();
  const payOrderMutation = usePayOrderMutation();
  const isLeader = user?.role === "leader";
  const isMyOrder = user?.id === order.userId;
  const displayPayorderButton = isMyOrder && !order.payed && order.price;
  const displayEditPriceButton = !order.price && !isMyOrder && isLeader;

  return (
    <Card raised key={order.id} {...forwardProps}>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {header}
          </Typography>
          <OrderPayedIcon payed={order.payed} />
        </div>
        <Typography variant="h5" component="div">
          {order?.details}
        </Typography>
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            gap: "2rem",
            paddingTop: "0.3rem",
          }}
        >
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`Price: ${order?.price || "N/A"} €`}
          </Typography>
          {displayPayorderButton && (
            <Button
              onClick={() => payOrderMutation.mutate(order)}
              variant="contained"
            >
              Mark as payed
            </Button>
          )}
          {displayEditPriceButton && (
            <Button onClick={() => onEditPrice?.(order)} variant="contained">
              Edit Price
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export function OrderPayedIcon({ payed }: { payed?: boolean }) {
  if (payed)
    return (
      <PriceCheckIcon
        color={"success"}
        titleAccess={"Order has been payed already"}
      />
    );
  return (
    <ErrorOutlineIcon
      color="error"
      titleAccess="This order still needs to be payed for"
    />
  );
}
