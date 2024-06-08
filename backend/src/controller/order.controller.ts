import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { AuthRequestDto } from 'src/dto/authDto';
import { EditPriceDto, OrderDto } from 'src/dto/orderDto';
import { OrderService } from '../service/order.service';
import { isEmpty } from 'lodash';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('getAllOrders')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('getMyOrders')
  getOrderFromUser(@Request() { user: { sub: userId } }: AuthRequestDto) {
    const order = this.orderService.getOrderFromUser(userId);
    if (isEmpty(order)) throw new NotFoundException(`No order found`);
    return order
  }

  @Put(':orderId')
  editOrder(
    @Param() { orderId }: { orderId: string },
    @Request() { user: { sub: userId } }: AuthRequestDto,
    @Body() orderDto: OrderDto,
  ) {
    return this.orderService.editOrder(userId, orderId, orderDto);
  }

  @Put('/editPrice/:orderId')
  editPrice(
    @Param() { orderId }: { orderId: string },
    @Request() { user: { sub: userId } }: AuthRequestDto,
    @Body() editPriceDto: EditPriceDto,
  ) {
    return this.orderService.editPrice(userId, orderId, editPriceDto.price);
  }

  @Post()
  createOrder(
    @Request() { user: { sub: userId } }: AuthRequestDto,
    @Body() orderDto: OrderDto,
  ) {
    return this.orderService.createOrder({ ...orderDto, userId });
  }
}
