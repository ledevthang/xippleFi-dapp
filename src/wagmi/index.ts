import { http, createConfig } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { XRPL_EVM } from "./chains";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    chains: [XRPL_EVM],
    connectors: [metaMask()],
    transports: {
      [XRPL_EVM.id]: http(),
    },
    walletConnectProjectId: "asdasd",
    appName: "Your App Name",
  }),
);
