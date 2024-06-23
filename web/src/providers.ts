import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const APP_NAME = "0xCafeBabe";
const APP_LOGO_URL = "https://example.com/logo.png";
const INFURA_ID = process.env.INFURA_ID;
const INFURA_RPC_URL = `https://mainnet.infura.io/v3/${INFURA_ID}`;
const DEFAULT_CHAIN_ID = 1;

// Coinbase Wallet Provider
export const getCoinbaseWalletProvider = () => {
  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false,
    overrideIsMetaMask: false,
  });
  return coinbaseWallet.makeWeb3Provider(INFURA_RPC_URL, DEFAULT_CHAIN_ID);
};