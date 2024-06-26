// src/components/RootLayout.tsx
import { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base, baseSepolia } from "wagmi/chains";
import { WagmiProvider, createConfig, http } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";

type Props = { children: ReactNode };

const rpcUrl =
  "https://api.developer.coinbase.com/rpc/v1/base/0dD2uvTjYG7Wp6QfzenzTi_OiY_Of91P";
const baseUrl = rpcUrl.replace(/\/v1\/(.+?)\//, "/v1/base/");
const baseSepoliaUrl = rpcUrl.replace(/\/v1\/(.+?)\//, "/v1/base-sepolia/");

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "cafebabe",
      preference: "all", // Setting this as all gives you the QR code for scanning with Coinbase wallet.
      chainId: base.id,
    }),
  ],
  ssr: false,
  transports: {
    [base.id]: http(baseUrl),
    [baseSepolia.id]: http(baseSepoliaUrl),
  },
});

function RootLayout({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider chain={base}>{children}</OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default RootLayout;
