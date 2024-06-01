import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { AuthRequestDto } from 'src/dto/authDto';
import { UserDto } from 'src/dto/userDto';
import { UserService } from 'src/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('leader')
  getLeader() {
    return this.userService.getLeader();
  }

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Request() req: AuthRequestDto) {
    return req.user;
  }
  // getUser() {
  //   return this.userService.getAllUser();
  // }

  @Post()
  createUser(@Body() userDto: UserDto) {
    this.userService.createUser(userDto);
  }
}
