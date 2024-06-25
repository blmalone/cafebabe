// src/components/RootLayout.tsx
import { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base, baseSepolia } from 'viem/chains';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';

type Props = { children: ReactNode };

const queryClient = new QueryClient();
const baseUrl = '/api/rpc';
const baseSepoliaUrl = '/api/rpc-sepolia';

const wagmiConfig = createConfig({
    chains: [base, baseSepolia],
    connectors: [
        coinbaseWallet({
            appName: 'cafebabe',
            preference: 'all',
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
