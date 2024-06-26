import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
} from '@nestjs/common';
import { isEmpty } from 'lodash';
import { Public } from 'src/decorators';
import { AuthRequestDto } from 'src/dto/authDto';
import { PostLeaderDto } from 'src/dto/postLeaderDto';
import { UserDto } from 'src/dto/userDto';
import { initialDb, mockDb } from 'src/mockDb';
import { UserService } from 'src/service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getMyUserData')
  getClientsUserData(@Request() { user: { sub: userId } }: AuthRequestDto) {
    return this.userService.getUserData(userId);
  }

  @Get('getLeader')
  getLeader() {
    const leader = this.userService.getLeader();
    if (!leader) throw new NotFoundException(`Currently no leader exists.`);
    return leader;
  }

  @Post('leader')
  setUserAsLeader(
    @Body() body: PostLeaderDto,
    @Request() { user: { sub: userId } }: AuthRequestDto,
  ) {
    const newPaypal = body.paypal;
    const userData = this.userService.getUserData(userId);
    if (!userData.paypalUrl && !newPaypal) {
      throw new BadRequestException(
        'You cant sign up as leader without having a paypal-me setup.',
      );
    }
    if (newPaypal) this.userService.editUser(userId, { paypalUrl: newPaypal });
    return this.userService.setUserAsLeader(userId);
  }

  @Post('follower')
  setUserAsFollower(@Request() { user: { sub: userId } }: AuthRequestDto) {
    return this.userService.setUserAsFollower(userId);
  }

  @Get('getFollower')
  getFollower() {
    const follower = this.userService.getFollowers();
    if (isEmpty(follower))
      throw new NotFoundException(`Currently no followers exists.`);
    return follower;
  }

  @Post()
  @Public()
  createUser(@Body() userDto: UserDto) {
    this.userService.createUser(userDto);
  }

  @Public()
  @Get('iniDb/noLeader')
  iniDbNoLeader() {
    mockDb.orders = JSON.parse(JSON.stringify(initialDb.orders));
    mockDb.users = JSON.parse(JSON.stringify(initialDb.users));
    return mockDb;
  }

  @Public()
  @Get('iniDb/mariaIsLeader')
  iniDbMariaIsLeader() {
    mockDb.orders = JSON.parse(JSON.stringify(initialDb.orders));
    mockDb.users = initialDb.users.map((user) => {
      if (user.name === 'maria') {
        return { ...user, role: 'leader' };
      }
      return user;
    });
    return mockDb;
  }
}
