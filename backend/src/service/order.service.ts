import { Injectable } from '@nestjs/common';
import { OrderDbo } from 'src/dbo/orderDbo';
import { mockDb } from 'src/mockDb';
import { Omit } from 'src/types';
import { uniqueId } from 'src/utils/uniqueId';

@Injectable()
export class OrderService {
  addOrder(order: Omit<OrderDbo, 'id'>) {
    mockDb.orders.push({ ...order, id: uniqueId() });
    return;
  }

  editOrder(
    orderId: string,
    newValues: Partial<Omit<OrderDbo, 'id' | 'userId'>>,
  ) {
    const orders = mockDb.orders.map((order) => {
      if (order.id !== orderId) return order;
      return { ...order, ...newValues };
    });
    mockDb.orders = orders;
  }

  getOrders() {
    return mockDb.orders;
  }

  getOrderFromUser(userId: string) {
    return mockDb.orders.find((order) => order.userId === userId);
  }
}
