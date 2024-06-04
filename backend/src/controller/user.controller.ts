import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { Public } from 'src/decorators';
import { AuthRequestDto } from 'src/dto/authDto';
import { UserDto } from 'src/dto/userDto';
import { UserService } from 'src/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('myUserData')
  getClientsUserData(@Request() { user: { sub: userId } }: AuthRequestDto) {
    return this.userService.getUserData(userId);
  }

  @Get('leader')
  getLeader() {
    return this.userService.getLeader();
  }

  @Post('leader')
  setUserAsLeader(@Request() { user: { sub: userId } }: AuthRequestDto) {
    return this.userService.setUserAsLeader(userId);
  }

  @Post('follower')
  setUserAsFollower(@Request() { user: { sub: userId } }: AuthRequestDto) {
    return this.userService.setUserAsFollower(userId);
  }

  @Post()
  @Public()
  createUser(@Body() userDto: UserDto) {
    this.userService.createUser(userDto);
  }
}
