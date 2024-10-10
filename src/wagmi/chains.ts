import { defineChain } from "viem";

export const XRPL_EVM = defineChain({
  id: 1440002,
  name: "XRPL EVM Sidechain",
  nativeCurrency: { name: "XRPL EVM Sidechain", symbol: "XRP", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-evm-sidechain.xrpl.org"] },
  },
  blockExplorers: {
    default: { name: "XRPLEVMSCAN", url: "https://explorer.xrplevm.org/" },
  },
});
