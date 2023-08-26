export interface AuthState {
  token: string | null;
  error: any | null;
}

export interface LoginResponse {
  email: string;
  password: string;
  token: string;
}
