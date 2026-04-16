export type LoginRequest = {
  login: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type CheckAuthResponse =
  | {
      isAuthenticated: false;
      userId?: string;
      role?: string;
    }
  | {
      isAuthenticated: true;
      userId: string;
      role: string;
    };

export type TokenEntity = {
  id: string;
  role: string;
};
