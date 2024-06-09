import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderDbo } from 'src/dbo/orderDbo';
import { mockDb } from 'src/mockDb';
import { Omit } from 'src/types';
import { uniqueId } from 'src/utils/uniqueId';

@Injectable()
export class OrderService {
  createOrder(order: Omit<OrderDbo, 'id'>) {
    const orderId = uniqueId();
    mockDb.orders.push({ ...order, id: orderId });
    return orderId;
  }

  editOrder(
    userId: string,
    orderId: string,
    newValues: Partial<Omit<OrderDbo, 'id' | 'userId'>>,
  ) {
    const orders = mockDb.orders.map((order) => {
      if (order.id !== orderId) return order;
      if (order.userId !== userId) {
        throw new HttpException(
          'You can only edit your own order.',
          HttpStatus.FORBIDDEN,
        );
      }
      return { ...order, ...newValues };
    });
    mockDb.orders = orders;
  }

  editPrice(userId: string, orderId: string, price: number) {
    const user = mockDb.users.find(
      (user) => user.id === userId && user.role === 'leader',
    );
    if (!user)
      throw new HttpException(
        'Only the leader can edit a price',
        HttpStatus.FORBIDDEN,
      );
    const orders = mockDb.orders.map((order) => {
      if (order.id !== orderId) return order;
      return { ...order, price };
    });
    mockDb.orders = orders;
  }

  getAllOrders() {
    const users = mockDb.users;
    return mockDb.orders.map((order) => {
      const user = users.find((user) => user.id === order.userId);
      return { ...order, username: user?.name };
    });
  }

  getOrderFromUser(userId: string) {
    return mockDb.orders.filter((order) => order.userId === userId);
  }
}
