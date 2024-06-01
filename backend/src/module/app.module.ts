import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { OrderController } from '../controller/order.controller';
import { UserController } from '../controller/user.controller';
import { AppService } from '../service/app.service';
import { OrderService } from '../service/order.service';
import { UserService } from '../service/user.service';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, UserController, OrderController],
  providers: [AppService, UserService, OrderService],
})
export class AppModule {}
