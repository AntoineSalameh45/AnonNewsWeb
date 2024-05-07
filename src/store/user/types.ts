export interface iState {
    message: string;
    accessToken: string;
    refreshToken: string;
    loading: boolean;
    error: string | boolean | null;
  }

export interface iSignUp {
    accessToken: string;
    refreshToken: string;
    message: string;
}

export interface iLogin {
    accessToken: string;
}