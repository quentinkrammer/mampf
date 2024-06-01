import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/dto/userDto';
import { UserService } from 'src/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('leader')
  getLeader() {
    return this.userService.getLeader();
  }

  @Get()
  getUser() {
    return this.userService.getAllUser();
  }

  @Post()
  createUser(@Body() userDto: UserDto) {
    this.userService.createUser(userDto);
  }
}
