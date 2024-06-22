import { useCallback, useEffect, useMemo, useState } from 'react';
import { Abi, TransactionExecutionError, UserRejectedRequestError, parseSignature } from 'viem';
import { useSimulateContract, useWaitForTransactionReceipt, useWriteContract, useSignTypedData, useAccount } from 'wagmi';
import { UseContractReturn } from '@/hooks/contracts';
import { useLoggedInUserCanAfford } from '@/hooks/useUserCanAfford';

export enum TransactionStates {
  START,
  COMPLETE,
  OUT_OF_GAS,
}

type AsyncFunction<Args extends unknown[], ReturnType> = (...args: Args) => Promise<ReturnType>;

const USDC_ADDRESS = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913';
const COFFEE_SHOP_ADDRESS = '0x9487C5e6eF2aeb9e684566F785359712EAF7A17F';
const BASE_CHAIN_ID = 8453;

export default function useSmartContractForms({
  gasFee,
  contract,
  name: functionName,
  arguments: args,
  enableSubmit: isValid,
  reset,
}: {
  gasFee: bigint;
  contract: UseContractReturn<Abi>;
  name: string;
  arguments: (number | string)[];
  enableSubmit: boolean;
  reset: AsyncFunction<unknown[], unknown>;
}) {
  const [transactionState, setTransactionState] = useState<TransactionStates | null>(null);
  const [signedData, setSignedData] = useState<string | null>(null);

  const { address: account } = useAccount();
  const { signTypedDataAsync, error: signTypedDataError, isLoading: isSigning } = useSignTypedData();

  const amountToCharge = args[0];

  const canAfford = useLoggedInUserCanAfford(gasFee);

  console.log("<OB> functionName: " + functionName)
  console.log(`<OB> args: ${args}`)

  const { data: contractRequest, error: simulateContractError, refetch: refetchSimulateContract } = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: functionName,
    args: args,
    query: {
      enabled: false, // Initial disable simulation query
    },
    value: gasFee,
  });

  console.log("<OB> contractRequest " + contractRequest)
  console.log("<OB> simulateContractError " + simulateContractError)
  console.log("<OB> refetchSimulateContract " + refetchSimulateContract)

  const {
    writeContract,
    data: dataHash,
    status: writeContractStatus,
    error: writeContractError,
  } = useWriteContract();

  const { status: transactionReceiptStatus } = useWaitForTransactionReceipt({
    hash: dataHash,
    query: {
      enabled: !!dataHash,
    },
  });

  const disabled = contract.status !== 'ready' || writeContractStatus === 'pending' || !canAfford || isSigning;

  const handleSignTypedData = useCallback(async (onSuccess: (signedData: string) => void) => {
    const domain = {
      name: 'USD Coin',
      chainId: BASE_CHAIN_ID,
      verifyingContract: USDC_ADDRESS,
      version: '2',
    };
    const types = {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };
    const message = {
      owner: account!,
      spender: COFFEE_SHOP_ADDRESS,
      value: 1, // Replace with actual value
      nonce: 1, // Replace with actual nonce
      deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
    };

    try {
      const signatureResult = await signTypedDataAsync({
        domain,
        types,
        primaryType: 'Permit',
        message,
      });

      if (signatureResult) {
        setSignedData(signatureResult);
        onSuccess(signatureResult);
      }
    } catch (error) {
      if (error instanceof UserRejectedRequestError) {
        setTransactionState(null);
      } else {
        setTransactionState(null);
      }
    }
  }, [account, signTypedDataAsync]);

  const onSubmitTransaction = useCallback(
    async (event: { preventDefault: () => void }) => {
      event.preventDefault();

      if (!account) {
        setTransactionState(null);
        return;
      }


      // FIGURE OUT how to pass in r s v to simulate
      await handleSignTypedData(async (signedData) => {
        console.log("<OB> got signed data: " + signedData)

       const result = parseSignature(signedData);
       console.log(result)

        try {
          const { data: simulationData, error: simulationError } = await refetchSimulateContract();
          if (simulationError) {
            setTransactionState(null);
            return;
          }

          const request = simulationData?.request;

          if (request) {
            writeContract(request);
            setTransactionState(TransactionStates.START);
          } else {
            setTransactionState(null);
          }
        } catch (error) {
          setTransactionState(null);
        }
      });
    },
    [account, handleSignTypedData, refetchSimulateContract, writeContract],
  );

  const resetContractForms = useCallback(() => {
    setTransactionState(null);
    setSignedData(null);
  }, []);

  useEffect(() => {
    async function onTransactionReceiptStatus() {
      if (!dataHash) return;

      if (transactionReceiptStatus === 'error') {
        if (
          writeContractError instanceof TransactionExecutionError &&
          writeContractError.message.toLowerCase().includes('out of gas')
        ) {
          setTransactionState(TransactionStates.OUT_OF_GAS);
        } else {
          setTransactionState(null);
        }
      }

      if (transactionReceiptStatus === 'success') {
        setTransactionState(TransactionStates.COMPLETE);
      }

      await reset();
    }

    void onTransactionReceiptStatus();
  }, [dataHash, reset, setTransactionState, transactionReceiptStatus, writeContractError]);

  useEffect(() => {
    if (signTypedDataError) {
      console.error("<OB> Error in signTypedData:", signTypedDataError);
    }
  }, [signTypedDataError]);

  return useMemo(
    () => ({
      disabled,
      transactionState,
      resetContractForms,
      onSubmitTransaction,
    }),
    [onSubmitTransaction, transactionState, disabled, resetContractForms],
  );
}
