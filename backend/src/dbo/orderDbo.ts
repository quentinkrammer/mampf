export interface OrderDbo {
  id: string;
  userId: string;
  details: string;
  price?: number;
  payed?: boolean;
}
