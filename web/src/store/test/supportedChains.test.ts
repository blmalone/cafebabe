import { base, base } from 'viem/chains';
import { Environment } from '../environment';
import { getChainsForEnvironment } from '../supportedChains';

describe('supportedChains', () => {
  describe('getChainsForEnvironment', () => {
    it('should return testnet for localhost', () => {
      expect(getChainsForEnvironment(Environment.localhost)).toEqual([base]);
    });

    it('should default to localhost', () => {
      expect(getChainsForEnvironment()).toEqual([base]);
    });

    it('should return mainnet for production', () => {
      expect(getChainsForEnvironment(Environment.production)).toEqual([base]);
    });
  });

  describe('getChainById', () => {
    it('should return null if chain is not found', () => {
      expect(getChainsForEnvironment(Environment.localhost)).toEqual([base]);
    });

    it('should return the chain if found', () => {
      expect(getChainsForEnvironment(Environment.localhost)).toEqual([base]);
    });
  });
});
