import { Controller, Get } from '@nestjs/common';
import { OrderService } from '../service/order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('orders')
  getOrders() {
    return this.orderService.getOrders();
  }
}
