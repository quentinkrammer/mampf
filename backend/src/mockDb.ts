import { OrderDbo } from './dbo/orderDbo';
import { UserDbo } from './dbo/userDbo';

export interface Db {
  users: UserDbo[];
  orders: OrderDbo[];
}

const mariaId = 'id_100'
export const mockDb: Db = {
  orders: [{ details: 'banana', id: 'id_101', userId: mariaId },
  { details: 'apple', id: 'id_102', userId: mariaId, payed: true, price: 10.42 },
  { details: 'olive', id: 'id_103', userId: mariaId, price: 9.99 }],
  users: [
    {
      id: 'id_99',
      name: 'john',
      password: '123',
    },
    {
      id: mariaId,
      name: 'maria',
      password: '123',
    },
  ],
};
