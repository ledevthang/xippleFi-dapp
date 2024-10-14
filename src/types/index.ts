import { TOKEN_LOGO } from "@/constants";

// common
export enum APP_ROUTE {
  HOME = "/",
  STAKE = "stake",
  SWAP = "swap",
}

export enum API_PATH {
  ASSETS = "/assets",
  AUTH_MESSAGE = "/auth/message",
  AUTH_VERIFY_SIGNATURE = "/auth/verify-signature",
}

export enum QUERY_KEY {
  SUPPLY_ASSETS = "SUPPLY_ASSETS",
  AUTH_MESSAGE = "AUTH_MESSAGE",
  AUTH_VERIFY_SIGNATURE = "AUTH_VERIFY_SIGNATURE",
}

export enum SECURE_SROGARE {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export type Token = keyof typeof TOKEN_LOGO;

export interface AppContextProps {
  isLogin: boolean;
  onLogin: (isLogin: boolean) => void;
}
