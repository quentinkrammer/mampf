import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { mockDb } from 'src/mockDb';
import { UserService } from 'src/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = mockDb.users.find(
      (user) => user.name === username && user.password === password,
    );
    if (!user) {
      throw new UnauthorizedException(
        'Username and/or password might be incorrect.',
      );
    }
    const payload = { sub: user.id, username: user.name };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
