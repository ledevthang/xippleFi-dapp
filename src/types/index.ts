import { TOKEN_LOGO } from "@/constants";

export enum APP_ROUTE {
  HOME = "/",
  STAKE = "stake",
  SWAP = "swap",
}

export type TokenLogo = keyof typeof TOKEN_LOGO;
