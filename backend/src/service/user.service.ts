import { Injectable } from '@nestjs/common';
import { UserDbo } from 'src/dbo/userDbo';
import { mockDb } from 'src/mockDb';
import { Omit } from 'src/types';
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

  getAllUser() {
    return mockDb.users;
  }

  getFollowers() {
    const followers = mockDb.users
      .filter(({ role }) => role === 'follower')
      .map(({ name }) => name);
    return followers;
  }
}
