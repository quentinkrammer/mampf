import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDbo } from 'src/dbo/userDbo';
import { mockDb } from 'src/mockDb';
import { Omit } from 'src/types';
import { omit } from 'src/utils/omit';
import { uniqueId } from 'src/utils/uniqueId';

@Injectable()
export class UserService {
  createUser(user: Omit<UserDbo, 'id'>) {
    const id = uniqueId();
    mockDb.users.push({ ...user, id });
    return id;
  }

  setRole(userId: UserDbo['id'], role: UserDbo['role']) {
    const users = mockDb.users.map((user) => {
      if (user.id !== userId) return user;
      return { ...user, role };
    });
    mockDb.users = users;
  }

  getLeader() {
    const leader = mockDb.users.find(({ role }) => role === 'leader');
    return { userId: leader?.id, name: leader?.name };
  }

  setUserAsLeader(userId: string) {
    if (this.getLeader()) {
      throw new HttpException(
        "This is an attemted mutiny. One more try and I'll have you be hanged.",
        HttpStatus.FORBIDDEN,
      );
    }
    this.setRole(userId, 'leader');
  }

  setUserAsFollower(userId: string) {
    const leader = this.getLeader();
    if (leader.userId === userId) {
      throw new HttpException(
        'Once a leader, always a leader.',
        HttpStatus.FORBIDDEN,
      );
    }
    this.setRole(userId, 'follower');
  }

  getAllUser() {
    return mockDb.users;
  }

  getFollowers() {
    const followers = mockDb.users
      .filter(({ role }) => role === 'follower')
      .map(({ name }) => name);
    return followers;
  }

  getUserData(id: string) {
    const user = mockDb.users.find((user) => user.id === id);
    if (!user)
      throw new NotFoundException(`User with id '${id}' coud not be found`);
    return omit(user, 'password');
  }
}
