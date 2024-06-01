import { Body, Controller, Get, Post, Request } from '@nestjs/common';
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
