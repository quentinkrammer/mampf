import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth.guard';
import { JWT_SECRET } from 'src/mockEnv';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { UsersModule } from './users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '99999999s' },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
