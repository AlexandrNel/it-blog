const STORAGE_KEY = "access_token";

class AccessToken {
  static set token(token: string) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, token);
    }
  }

  static get token(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return window.localStorage.getItem(STORAGE_KEY);
  }

  static get header() {
    return this.getHeader();
  }

  static clear() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  static getHeader(token: string | null = this.token) {
    return token && `Bearer ${token}`;
  }
}

export { AccessToken };
