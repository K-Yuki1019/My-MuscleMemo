export interface User {
  uid: string;
  userName: string;
  avatarUrl: string;
  height: string;
  weight: string;
  gender: 'men' | 'woman' | 'other';
  description: 'string';
}
