import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export function createWagmiConfig(rpcUrl: string, projectId?: string) {
  // Keep this till we fully deprecated RK inside the template
  if (projectId) {
    console.log('projectId:', projectId);
  }

  // Temporary hack, until we configure a FE page in OnchainKit to copy just the API key
  const baseUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base/');

  return createConfig({
    chains: [base],
    connectors: [
      coinbaseWallet({
        appName: '0xCafeBabe',
        preference: 'all', // Setting this as all gives you the QR code for scanning with Coinbase wallet.
      }),
    ],
    ssr: true,
    transports: {
      [base.id]: http(baseUrl),
    },
  });
}
