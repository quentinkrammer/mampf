import { OrderDbo } from './dbo/orderDbo';
import { UserDbo } from './dbo/userDbo';

export interface Db {
  users: UserDbo[];
  orders: OrderDbo[];
}

export const mockDb: Db = { orders: [], users: [] };
