import { BREAKPOINTS } from "@/constants";
import { TOKEN_IDS } from "@/constants/swap/token";

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
  TOKEN_IN = "TOKEN_IN",
  TOKEN_OUT = "TOKEN_OUT",
}

export enum SECURE_SROGARE {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export type Token = keyof typeof TOKEN_IDS;

export interface AppContextProps {
  isLogin: boolean;
  onLogin: (isLogin: boolean) => void;
}

export type Breakpoints = (typeof BREAKPOINTS)[keyof typeof BREAKPOINTS];
