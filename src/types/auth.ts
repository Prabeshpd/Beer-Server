import UserInfo from './user';

export interface LoginResponse {
  code: number;
  message: string;
  data: {
    user: UserInfo;
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RefreshResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface RefreshPayload {
  refreshToken: string;
}
