import { useAccount, useBalance } from 'wagmi';
import { useEffect, useState } from 'react';

/**
 * Utility to see if an address balance can afford to transact for a certain amount
 *
 * @param address address of user to check balance for
 * @param amount amount to check if user can afford
 * @returns {boolean}
 */
export function useAddressCanAfford(address: `0x${string}`, amount: bigint) {
  const { data, isError, isLoading, error } = useBalance({
    address: address,
  });

  useEffect(() => {
    console.log("isError:", isError);
    console.log("isLoading:", isLoading);
    console.log("data:", data);
    if (isError && error) {
      console.error('Error fetching balance:', error);
    }
  }, [isError, isLoading, data, error]);

  if (isLoading) {
    // You might want to handle the loading state in your component
    console.log('Loading balance data...');
    return false;
  }

  if (isError) {
    console.error('Error fetching balance');
    return false;
  }

  if (!data) {
    console.log('No balance data available');
    return false;
  }

  return amount <= data.value;
}

/**
 * Utility to see if the current logged in user can afford to transact for a certain amount
 *
 * @param address address of user to check balance for
 * @param amount amount to check if user can afford
 * @returns {boolean}
 */
export function useLoggedInUserCanAfford(amount: bigint) {
  const account = useAccount();
  console.log("####### useLoggedInUserCanAfford #######");
  console.log(account);
  console.log("####### useLoggedInUserCanAfford #######");

  return useAddressCanAfford(account.address as `0x${string}`, amount);
}
