import { config } from "@/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { WagmiProvider } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import DialogProvider from "./dialog-provider";

// Create a client
const queryClient = new QueryClient();

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DialogProvider>
          <ConnectKitProvider
            mode="dark"
            customTheme={{
              "--ck-font-family": '"Oxanium", sans-serif',
              "--ck-body-background": `#070707 linear-gradient(88.8deg, rgba(255, 255, 255, 0.062) 6.02%, rgba(153, 153, 153, 0) 83.28%)`,
            }}
          >
            {children}
          </ConnectKitProvider>
        </DialogProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
