import { OrderDbo } from './dbo/orderDbo';
import { UserDbo } from './dbo/userDbo';

export interface Db {
  users: UserDbo[];
  orders: OrderDbo[];
}

export const mockDb: Db = {
  orders: [],
  users: [
    {
      id: 'id_99',
      name: 'john',
      password: '123',
    },
    {
      id: 'id_100',
      name: 'maria',
      password: '123',
    },
  ],
};
