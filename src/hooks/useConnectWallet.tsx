import { useCallback } from "react";
import { useConnect, useDisconnect, useChains, useAccount } from "wagmi";

function useConnectWallet() {
  const { connectors, connect, reset } = useConnect();
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const chains = useChains();
  const connector = connectors[0];
  const chain = chains[0];

  const onConnect = useCallback(() => {
    console.log("run");
    connect({ connector: connector, chainId: chain.id });
  }, [chain.id, connect, connector]);

  const onDisconnect = () => {
    reset();
    disconnect();
  };

  return {
    address,
    isConnected,
    isConnecting,
    onConnect,
    onDisconnect,
  };
}

export default useConnectWallet;
