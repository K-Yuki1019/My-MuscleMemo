export interface User {
  uid: string;
  userName: string;
  avatarUrl: string;
  height: string;
  weight: string;
  gender: 'man' | 'woman' | 'other';
  bodyImage: string;
  description: string;
  likedCount: number;
}
