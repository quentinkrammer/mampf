import {
  Body,
  Controller,
  Get,
  NotFoundException,
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

  @Get('getMyOrder')
  getOrderFromUser(@Request() { user: { sub: userId } }: AuthRequestDto) {
    const order =  this.orderService.getOrderFromUser(userId);
    if(!order) throw new NotFoundException(`No order found`);
    return order
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
