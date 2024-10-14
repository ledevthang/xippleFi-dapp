import { Token } from "@/types";

export const dialogBodyStyles =
  "bg-dialog border-none sm:max-w-[420px] max-w-[360px]";

export const ASSETS = {
  Btc: {
    id: "bitcoin",
    symbol: "BTC",
    heartbeat: 3600,
    threshold: 0.5,
  },
  Eth: {
    id: "ethereum",
    symbol: "ETH",
    heartbeat: 3600,
    threshold: 0.5,
  },
  Xrp: {
    id: "xrp",
    symbol: "XRP",
    heartbeat: 3600 * 24,
    threshold: 0.5,
  },
  Tron: {
    id: "tron",
    symbol: "TRX",
    heartbeat: 600,
    threshold: 0.2,
  },
  Bnb: {
    id: "binance-coin",
    symbol: "BNB",
    heartbeat: 3600 * 24,
    threshold: 0.5,
  },
  Usdt: {
    id: "tether",
    symbol: "USDT",
    heartbeat: 3600 * 24,
    threshold: 0.25,
  },
};

export const TOKEN_LOGO = {
  BTC: "/assets/BTC.svg",
  ETH: "/assets/ETH.svg",
  XRP: "/assets/XRP.svg",
  TRX: "/assets/TRX.svg",
  BNB: "/assets/BNB.svg",
  USDT: "/assets/USDT.svg",
};

export const TOKENS: { symbol: Token }[] = [
  {
    symbol: "XRP",
  },
  {
    symbol: "BTC",
  },
  {
    symbol: "ETH",
  },
  {
    symbol: "TRX",
  },
  {
    symbol: "BNB",
  },
  {
    symbol: "USDT",
  },
];
