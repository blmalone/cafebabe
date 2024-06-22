import { base } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import COFFEE_SHOP_ABI from './CoffeeShopABI';

export const useCoffeeShopContract = generateContractHook({
  abi: COFFEE_SHOP_ABI,
  [base.id]: {
    chain: base,
    // TODO: Don't hardcode the proxy in, should be a log in for the coffee shop
    address: '0x9D2de1e7A04217dC01D68f4A93E342c2ED2928f2',
  },
});
