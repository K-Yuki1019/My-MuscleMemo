export interface User {
  uid: string;
  userName: string;
  avatarUrl: string;
  height: string;
  weight: string;
  gender: 'man' | 'woman' | 'other';
  description: string;
}
