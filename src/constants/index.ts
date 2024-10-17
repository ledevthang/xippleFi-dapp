import { APP_ROUTE } from "@/types";

export const dialogBodyStyles =
  "bg-dialog border-none sm:max-w-[420px] max-w-[360px] z-50";

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

export const BREAKPOINTS = {
  0: "xs",
  640: "sm",
  768: "md",
  1024: "lg",
  1280: "xl",
  1536: "2xl",
} as const;

export const NAVBARS = [
  {
    to: APP_ROUTE.HOME,
    label: "LENDING",
  },
  {
    to: APP_ROUTE.STAKE,
    label: "STAKE",
  },
  {
    to: APP_ROUTE.SWAP,
    label: "SWAP",
  },
];
