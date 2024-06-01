export interface UserDbo {
  id: string;
  name: string;
  password: string;
  role?: 'leader' | 'follower';
}
