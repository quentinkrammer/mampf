export interface UserDbo {
  id: string;
  name: string;
  password: string;
  paypalUrl?: string;
  role?: 'leader' | 'follower';
}
