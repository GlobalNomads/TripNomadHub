export interface OauthData {
  createdAt: string;
  updatedAt: string;
  appKey: string;
  provider: string;
  teamId: string;
  id: number;
}

export interface OauthUser {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface OauthSignupData {
  user: OauthUser;
  refreshToken: string;
  accessToken: string;
}
