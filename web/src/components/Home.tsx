// src/components/Home.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Center,
  Container,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { ConnectAccount } from "@coinbase/onchainkit/esm/wallet";
import { Avatar, Address } from "@coinbase/onchainkit/esm/identity";
import {
  useAccount,
  useDisconnect,
  useSignTypedData,
  useChainId,
  useReadContract,
  useWriteContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from "wagmi";
import "@coinbase/onchainkit/src/styles.css";
import "../styles/fonts.css";
import "../styles/connections.css";
import { USDC_ABI } from "../abi/USDC";
import { parseUnits, parseSignature } from "viem";
import { COFFEE_SHOP_ABI } from "../abi/CoffeeShopABI";
import { useMemo } from "react";
import { base } from "wagmi/chains";

const COFFEE_SHOP_PROXY_ADDRESS = "0xc5abB05dCAe31dF09C699C3126c56bBD95E186cA";
const USDC_ADDRESS = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";
const COINBASE_BLUE = "#0052ff";

enum LoyaltyScheme {
  None = 0,
  Randomized = 1,
  Predictable = 2,
}

export default function Home() {
  const [accountStatus, setAccountStatus] = useState<string>("disconnected");
  const [error, setError] = useState<string>("");
  const [connectedAddress, setConnectedAddress] = useState<`0x${string}`>("0x");
  const [loyaltyMessage, setLoyaltyMessage] = useState<string>("");
  const [lastVisit, setLastVisit] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<`0x${string}`>("0x");
  const [isTransactionRunning, setIsTransactionRunning] = useState(false);

  const handleBuyCryptoButtonClick = () => {
    const standaloneOnramp = (window as any).StripeOnramp.Standalone({
      source_currency: "usd",
      amount: { source_amount: "10" },
      destination_networks: ["ethereum"],
      destination_currencies: ["eth"],
      destination_currency: "eth",
      destination_network: "ethereum",
    });
    const redirectUrl = standaloneOnramp.getUrl();
    window.open(redirectUrl, "_blank");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d*$/;

    if (regex.test(value) || value === "") {
      setAmount(value);
      setError("");
    } else {
      setError("Please enter a valid amount");
    }
  };

  function useLoyaltySchemeFromChain() {
    const { address } = useAccount();
    const contractReadResult = useReadContract({
      abi: COFFEE_SHOP_ABI,
      address: COFFEE_SHOP_PROXY_ADDRESS,
      functionName: "getLoyaltyScheme",
    });

    return useMemo(
      () => ({
        loyaltyScheme:
          contractReadResult.status === "success"
            ? contractReadResult.data
            : null,
        isLoading: contractReadResult.status === "pending",
        isError: contractReadResult.status === "error",
        refetchNonce: contractReadResult.refetch,
      }),
      [contractReadResult]
    );
  }

  function useLoyaltyPointsFromChain() {
    const { address } = useAccount();
    const contractReadResult = useReadContract({
      abi: COFFEE_SHOP_ABI,
      address: COFFEE_SHOP_PROXY_ADDRESS,
      functionName: "loyaltyPoints",
      args: [address],
    });

    return useMemo(
      () => ({
        loyaltyPoints:
          contractReadResult.status === "success"
            ? contractReadResult.data
            : null,
        isLoading: contractReadResult.status === "pending",
        isError: contractReadResult.status === "error",
        refetchNonce: contractReadResult.refetch,
      }),
      [contractReadResult]
    );
  }

  function useNumPurchasesBeforeFreeFromChain() {
    const { address } = useAccount();
    const contractReadResult = useReadContract({
      abi: COFFEE_SHOP_ABI,
      address: COFFEE_SHOP_PROXY_ADDRESS,
      functionName: "numPurchasesBeforeFree",
      args: [],
    });

    return useMemo(
      () => ({
        numPurchasesBeforeFree:
          contractReadResult.status === "success"
            ? contractReadResult.data
            : null,
        isLoading: contractReadResult.status === "pending",
        isError: contractReadResult.status === "error",
        refetchNonce: contractReadResult.refetch,
      }),
      [contractReadResult]
    );
  }

  const AccountConnect = () => {
    const { address, status } = useAccount();
    const { disconnect } = useDisconnect();
    const {
      loyaltyScheme,
      isLoading: isloyaltySchemeLoading,
      isError: isloyaltySchemeError,
    } = useLoyaltySchemeFromChain();
    const {
      loyaltyPoints,
      isLoading: isLoyaltyPointsLoading,
      isError: isloyaltyPointsError,
    } = useLoyaltyPointsFromChain();
    const {
      numPurchasesBeforeFree,
      isLoading: isNumPurchasesLoading,
      isError: isNumPurchasesError,
    } = useNumPurchasesBeforeFreeFromChain();

    useEffect(() => {
      if (status === "connected") {
        setAccountStatus("connected");
        setLastVisit("10 days ago");
        setConnectedAddress(address);
      } else if (status === "disconnected") {
        setLoyaltyMessage("");
        setAccountStatus("disconnected");
        setLastVisit("");
        setConnectedAddress("0x");
      }
    }, [status]);

    useEffect(() => {
      if (
        !isloyaltySchemeLoading &&
        !isloyaltySchemeError &&
        !isLoyaltyPointsLoading &&
        !isloyaltyPointsError &&
        !isNumPurchasesLoading &&
        !isNumPurchasesError
      ) {
        switch (loyaltyScheme) {
          case LoyaltyScheme.Randomized:
            setLoyaltyMessage(
              "Randomized -- any one of your coffee purchases could be free!"
            );
            break;
          case LoyaltyScheme.Predictable:
            setLoyaltyMessage(
              `Every ${BigInt(
                numPurchasesBeforeFree as number
              )}th coffee will be free. You have ${
                BigInt(numPurchasesBeforeFree as number) -
                BigInt(loyaltyPoints as number)
              } to go!`
            );
            break;
          default:
            setLoyaltyMessage("No loyalty scheme is currently active");
            break;
        }
      }
    }, [loyaltyScheme, loyaltyPoints, numPurchasesBeforeFree]);

    return (
      <div className="flex flex-grow items-center justify-center">
        {(() => {
          if (status === "disconnected") {
            return <ConnectAccount />;
          }
          return (
            <div className="flex flex-grow items-center justify-center">
              {address && (
                <button
                  type="button"
                  onClick={() => disconnect()}
                  className="bg-red-500 text-white px-4 py-2 rounded cafebabe-title"
                  style={{
                    backgroundColor: "#FF7074",
                    color: "white",
                    marginTop: 10,
                  }} // Inline styles as a fallback
                >
                  Disconnect
                </button>
              )}
            </div>
          );
        })()}
      </div>
    );
  };

  function useOnchainBalance() {
    const { address } = useAccount();

    const contractReadResult = useReadContract({
      abi: USDC_ABI,
      address: USDC_ADDRESS,
      functionName: "balanceOf",
      args: [address],
    });

    return useMemo(
      () => ({
        balance:
          contractReadResult.status === "success"
            ? contractReadResult.data
            : null,
        isLoading: contractReadResult.status === "pending",
        isError: contractReadResult.status === "error",
        refetchBalance: contractReadResult.refetch,
      }),
      [contractReadResult]
    );
  }

  function useNonce() {
    const { address } = useAccount();
    const contractReadResult = useReadContract({
      abi: USDC_ABI,
      address: USDC_ADDRESS,
      functionName: "nonces",
      args: [address],
    });
    return useMemo(
      () => ({
        nonce:
          contractReadResult.status === "success"
            ? contractReadResult.data
            : null,
        isLoading: contractReadResult.status === "pending",
        isError: contractReadResult.status === "error",
        refetchNonce: contractReadResult.refetch,
      }),
      [contractReadResult]
    );
  }

  function useWaitForTxReceipt(transactionHash: `0x${string}`) {
    if (transactionHash == "0x") {
      return {
        receipt: null,
        isLoading: false,
        isError: false,
        refetchReceipt: () => {},
      };
    }

    const receipt = useWaitForTransactionReceipt({
      hash: transactionHash as `0x${string}`,
    });

    return useMemo(
      () => ({
        receipt: receipt.status === "success" ? receipt.data : null,
        isLoading: receipt.status === "pending",
        isError: receipt.status === "error",
        refetchReceipt: receipt.refetch,
      }),
      [receipt]
    );
  }

  const PayButton = () => {
    const useChainResult = useSwitchChain();
    const { signTypedDataAsync } = useSignTypedData();
    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const {
      balance,
      isLoading: isBalanceLoading,
      isError: isBalanceError,
    } = useOnchainBalance();
    const {
      nonce,
      isLoading: isNonceLoading,
      isError: isNonceError,
    } = useNonce();

    const {
      receipt,
    isLoading: isReceiptLoading,
      isError: isReceiptError,
      refetchReceipt,
    } = useWaitForTxReceipt(transactionHash);

    const chainId = useChainId();

    const USDC_DECIMALS = 6;
    const convertedAmount = parseUnits(amount, USDC_DECIMALS);

    const payWithTransaction = async () => {
      setIsTransactionRunning(true); 
      setTransactionHash("0x"); 

      if (isBalanceLoading || isNonceLoading || isNonceError) {
        setError("Error fetching balance or nonce or insufficient funds");
        setIsTransactionRunning(false);
        return;
      }

      if (BigInt(Number(balance)) < convertedAmount) {
        setError("You don't have enough funds for this payment!");
        setIsTransactionRunning(false);
        return;
      }

      const domain = {
        name: "USD Coin",
        chainId: chainId,
        verifyingContract: USDC_ADDRESS as `0x${string}`,
        version: "2",
      };

      const types = {
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      } as const;

      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
      const message = {
        owner: address as `0x${string}`,
        spender: COFFEE_SHOP_PROXY_ADDRESS as `0x${string}`,
        value: BigInt(convertedAmount),
        nonce: BigInt(Number(nonce)),
        deadline: BigInt(deadline),
      } as const;

      try {
        // We have to do this otherwise wagmi uses default eth chain id no matter what...
        await useChainResult.switchChainAsync({ chainId: base.id });
        const signatureResult = await signTypedDataAsync({
          domain,
          types,
          primaryType: "Permit",
          message,
        });

        const { v, r, s } = parseSignature(signatureResult);

        const txHash = await writeContractAsync({
          abi: COFFEE_SHOP_ABI,
          address: COFFEE_SHOP_PROXY_ADDRESS,
          functionName: "pay",
          args: [convertedAmount, deadline, v, r, s],
          chainId: base.id,
        });
        setTransactionHash(txHash);
        setAmount("");
      } catch (error) {
        console.error("Error when paying: ", error);
      }
      setIsTransactionRunning(false);
    };

    return (
      <Box>
        {error && <Box color="red">{error}</Box>}
        {!isTransactionRunning && !isReceiptLoading &&(
          <Button
            bgColor="#344afb"
            color="white"
            _hover={{ bg: "green" }}
            className="cafebabe-title"
            onClick={payWithTransaction}
            isDisabled={
              !amount ||
              isBalanceLoading ||
              isNonceLoading
            }
          >
            Pay
          </Button>
        )}
        {(isTransactionRunning || isReceiptLoading) && <Spinner />}
        {receipt && (
          <Box color="green.500" mt="4" textAlign="center">
            <Link
              href={`https://basescan.org/tx/${transactionHash}`}
              isExternal
            >
              View your transaction
            </Link>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Container maxW="container.md" centerContent>
      <Box position="absolute" top={4} right={4}>
        <Button
          bgColor="#344afb"
          color="white"
          className="cafebabe-title"
          onClick={handleBuyCryptoButtonClick}
          sx={{
            fontSize: "0.75rem",
            padding: "0.5rem 0.6rem",
          }}
        >
          Buy Crypto
        </Button>
      </Box>
      <Center
        className={
          accountStatus === "connected" ? "connected" : "not-connected"
        }
      >
        <VStack spacing={6}>
          <VStack spacing={0} textAlign="center">
            <Text
              fontSize={["2em", "3em", "4em", "5em"]}
              fontWeight="600"
              color={COINBASE_BLUE}
              className="cafebabe-title"
            >
              cafebabe
            </Text>
            <Text
              fontSize={["1em", "1.25em", "1.5em", "1.75em"]}
              fontWeight="600"
              color={COINBASE_BLUE}
              opacity={0.8}
              className="cafebabe-title"
            >
              loyalty, rewarded
            </Text>
          </VStack>
          <Box
            w="full"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            textAlign="center"
            bg="blue.50"
          >
            {accountStatus === "disconnected" && (
              <Text fontSize="small" className="cafebabe-title" mb={2}>
                Connection
              </Text>
            )}
            {connectedAddress && (
              <b>
                <Center marginBottom={2}>
                  <Avatar
                    loadingComponent={
                      <div className="h-8 w-8">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polygon
                            points="6,1 14,1 19,6 19,14 14,19 6,19 1,14 1,6"
                            fill="yellow"
                            stroke="yellow"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                    }
                    defaultComponent={
                      <div className="h-8 w-8">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polygon
                            points="6,1 14,1 19,6 19,14 14,19 6,19 1,14 1,6"
                            fill="green"
                            stroke="green"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                    }
                    address={connectedAddress}
                  />
                </Center>
              </b>
            )}
            {connectedAddress && (
              <Address className="cafebabe-title" address={connectedAddress} />
            )}
            <AccountConnect />
          </Box>

          {accountStatus === "connected" && (
            <VStack>
              <Box
                w="full"
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                textAlign="center"
                overflow="hidden"
                bg="blue.50"
              >
                <Text fontSize="small" className="cafebabe-title" mb={2}>
                  Order total
                </Text>
                <VStack spacing={4}>
                  <Input
                    className="cafebabe-title"
                    placeholder={"amount"}
                    maxLength={20}
                    value={amount}
                    onChange={handleAmountChange}
                    w="300px"
                  />
                  <PayButton />
                </VStack>
              </Box>

              <Box
                w="full"
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                textAlign="center"
                overflow="hidden"
                bg="gray.50"
                mt={4}
              >
                <Text fontSize="medium" className="cafebabe-title" mb={2}>
                  <b>Account</b>
                </Text>
                <Text marginTop={5} fontSize="small" className="cafebabe-title">
                  <b>Loyalty Scheme</b>
                  <br />
                  {loyaltyMessage}
                  <br />
                </Text>
                <Text marginTop={5} fontSize="small" className="cafebabe-title">
                  <b>Last Visit</b> <br />
                  {lastVisit}
                </Text>
              </Box>
            </VStack>
          )}
          {error && (
            <Box color="#FF7074" mt="4" textAlign="center">
              {error}
            </Box>
          )}
        </VStack>
      </Center>
    </Container>
  );
}
