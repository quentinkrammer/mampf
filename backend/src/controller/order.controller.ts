import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { AuthRequestDto } from 'src/dto/authDto';
import { OrderDto } from 'src/dto/orderDto';
import { OrderService } from '../service/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('myOrder')
  getOrderFromUser(@Request() { user: { sub: userId } }: AuthRequestDto) {
    return this.orderService.getOrderFromUser(userId);
  }

  @Patch(':orderId')
  editOrder(
    @Param('orderId') orderId: string,
    @Request() { user: { sub: userId } }: AuthRequestDto,
    @Body() orderDto: OrderDto,
  ) {
    return this.orderService.editOrder(orderId, userId, orderDto);
  }

  @Post()
  createOrder(
    @Request() { user: { sub: userId } }: AuthRequestDto,
    @Body() orderDto: OrderDto,
  ) {
    return this.orderService.createOrder({ ...orderDto, userId });
  }
}
