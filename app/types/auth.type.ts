export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RequestToken {
  accessToken: string;
  refreshToken: string;
}
