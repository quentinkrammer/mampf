import { Module } from '@nestjs/common';
import { OrderController } from '../controller/order.controller';
import { UserController } from '../controller/user.controller';

import { OrderService } from '../service/order.service';
import { UserService } from '../service/user.service';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [UserController, OrderController],
  providers: [UserService, OrderService],
})
export class AppModule {}
