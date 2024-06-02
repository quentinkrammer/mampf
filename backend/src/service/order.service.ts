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

  getAllOrders() {
    return mockDb.orders;
  }

  getOrderFromUser(userId: string) {
    return mockDb.orders.find((order) => order.userId === userId);
  }
}
