export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  repeatPassword: string;
}

export interface AuthData {
  username: string;
  token: string;
  isSuperuser: boolean;
}

export type AuthResponse = AuthData;

export interface IAuthContext {
  authData: AuthData;
  loginUserContext: (loginData: AuthData) => void;
  logoutUserContext: () => void;
}
