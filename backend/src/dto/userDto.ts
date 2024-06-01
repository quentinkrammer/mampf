export class UserDto {
  name: string;
  password: string;
  role?: 'leader' | 'follower';
}
