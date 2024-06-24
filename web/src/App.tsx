import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Center,
  Container,
} from "@chakra-ui/react";
import { ConnectAccount } from '@coinbase/onchainkit/esm/wallet';
import { Avatar, Address } from '@coinbase/onchainkit/esm/identity';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount, useDisconnect, useSignTypedData, useChainId, useReadContract, useWriteContract, createConfig, http, useSwitchChain } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import '@coinbase/onchainkit/src/styles.css';
import './styles/fonts.css';
import './styles/connections.css';
import { coinbaseWallet } from 'wagmi/connectors';
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { USDC_ABI } from "./abi/USDC";
import { parseUnits, parseSignature } from "viem";
import { COFFEE_SHOP_ABI } from "./abi/CoffeeShopABI";

const rpcUrl = "https://api.developer.coinbase.com/rpc/v1/base/0dD2uvTjYG7Wp6QfzenzTi_OiY_Of91P";
const baseUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base/');
const baseSepoliaUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base-sepolia/');

const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'cafebabe',
      preference: 'all', // Setting this as all gives you the QR code for scanning with Coinbase wallet.
      chainId: base.id,
    }),
  ],
  ssr: false,
  transports: {
    [base.id]: http(baseUrl),
    [baseSepolia.id]: http(baseSepoliaUrl),
  },
})


const COFFEE_SHOP_PROXY_ADDRESS = "0xCdBCB45E94C09c439CD314AEd01e50C4Df292e13";
const USDC_ADDRESS = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";
const COINBASE_BLUE = "#0052ff";

export default function Home() {
  const [provider] = useState<any>();
  const [accountStatus, setAccountStatus] = useState<string>("disconnected");
  const [error, setError] = useState<string>("");
  const [connectedAddress, setConnectedAddress] = useState<string>("");
  const [loyaltyMessage, setLoyaltyMessage] = useState<string>("");
  const [lastVisit, setLastVisit] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [freeCoffeeMessage, setFreeCoffeeMessage] = useState<string>("");

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


  // const checkUSDCBalance = async (signer: ethers.Signer, amountInWei: ethers.BigNumber) => {
  //   const usdcContract = new ethers.Contract(
  //     USDC_ADDRESS,
  //     ["function balanceOf(address owner) view returns (uint256)"],
  //     signer
  //   );
  //   const balance = await usdcContract.balanceOf(account);
  //   return balance.gte(amountInWei);
  // };

  // try {
  //   const ethersProvider = new ethers.providers.Web3Provider(provider);
  //   const signer = ethersProvider.getSigner();
  //   const contract = new ethers.Contract(COFFEE_SHOP_ADDRESS, COFFEE_SHOP_ABI, signer);

  //   const amountInWei = ethers.utils.parseUnits(amount, USDC_DECIMALS);
  //   let receipt;

  //   const hasEnoughUSDC = await checkUSDCBalance(signer, amountInWei);

  //   if (!hasEnoughUSDC) {
  //     const rate = await fetchExchangeRate("usdc");
  //     const ethAmount = ethers.utils.parseUnits((amount / rate).toString(), "ether");

  //     const tx = await signer.sendTransaction({
  //       to: COFFEE_SHOP_ADDRESS,
  //       value: ethAmount,
  //     });
  //     receipt = await tx.wait();
  //     setTransactionHash(receipt.transactionHash);
  //     toast({
  //       title: "Payment successful",
  //       description: "Payment made using ETH.",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } else {
  //     const { value, v, r, s } = await signPermit(signer, amountInWei);

  //     const tx = await contract.pay(amountInWei, value.deadline, v, r, s);
  //     receipt = await tx.wait();
  //     setTransactionHash(receipt.transactionHash);
  //   }

  //   let freeCoffeeGranted = false;
  //   let numCoffees = 0;
  //   let numCoffeesLeft = 0;

  //   for (const log of receipt.logs) {
  //     try {
  //       const parsedLog = contract.interface.parseLog(log);
  //       if (parsedLog.name === "FreeCoffee") {
  //         freeCoffeeGranted = true;
  //         break;
  //       } else if (parsedLog.name === "Payment") {
  //         numCoffees = parsedLog.args.numCoffees.toNumber();
  //         numCoffeesLeft = 9 - (numCoffees % 9);
  //         numCoffees += 1;
  //         var isNextCoffeeFree = (numCoffees % 9) === 0;
  //       }
  //     } catch (e) {
  //     }
  //   }

  //   if (freeCoffeeGranted) {
  //     setFreeCoffeeMessage("Congratulations! You got a free coffee!");
  //   } else if (isNextCoffeeFree) {
  //     setFreeCoffeeMessage(`Payment successful. Your next coffee is free!.`);
  //   } else if (numCoffees > 0) {
  //     setFreeCoffeeMessage(`Payment successful. You have ${numCoffeesLeft} coffee${numCoffeesLeft === 1 ? '' : 's'} left until your next free one.`);
  //   } else {
  //     setFreeCoffeeMessage("Payment successful. Enjoy your coffee!");
  //   }

  // } catch (error: any) {
  //   let errorMessage = error.message;

  //   if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
  //     const errorData = error.data?.originalError?.data;
  //     if (errorData) {
  //       const reason = ethers.utils.toUtf8String('0x' + errorData.slice(138));
  //       errorMessage = `Transaction failed: ${reason}`;
  //     }
  //   }

  //   setError(new Error(errorMessage));
  // }
  //}

  const AccountConnect = () => {
    const { address, status } = useAccount();
    const { disconnect } = useDisconnect();

    useEffect(() => {
      if (status === 'connected') {
        setAccountStatus('connected');
        setLoyaltyMessage("There's a 10% chance your next coffee will be free");
        setLastVisit("10 days ago");
        setConnectedAddress(address);
      } else if (status === 'disconnected') {
        setLoyaltyMessage("");
        setAccountStatus('disconnected');
        setLastVisit("");
        setConnectedAddress("");
      }
    }, [status]);

    return (
      <div className="flex flex-grow items-center justify-center">
        {(() => {
          if (status === 'disconnected') {
            return <ConnectAccount />;
          }

          return (
            <div className="flex flex-grow items-center justify-center">
              {address && (
                <button
                  type="button"
                  onClick={() => disconnect()}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  style={{ backgroundColor: '#FF7074', color: 'white', marginTop: 10 }} // Inline styles as a fallback
                >
                  Disconnect
                </button>
              )}
            </div>
          );
        })()}
      </div>
    );
  }

  const PayButton = () => {
    const useChainResult = useSwitchChain();
    const { signTypedDataAsync } = useSignTypedData();
    const { address, chainId, chain } = useAccount();
    const { writeContractAsync } = useWriteContract();

    const chainIdFromChainId = useChainId();
    const nonce = useReadContract({
      abi: USDC_ABI,
      address: USDC_ADDRESS,
      functionName: 'nonces',
      args: [address],
    })
    const USDC_DECIMALS = 6;
    const convertedAmount = parseUnits(amount, USDC_DECIMALS);


    console.log("address: ", address);
    console.log("chainId from useChainId: ", chainIdFromChainId);
    console.log("nonce: ", nonce.data);
    console.log("convertedAmount: ", convertedAmount);
    console.log("chainId from useAccount: ", chainId);
    console.log("chain from useAccount: ", chain);

    const payWithTransaction = async () => {
      console.log("payWithTransaction called");

      const domain = {
        name: 'USD Coin',
        chainId: base.id,
        verifyingContract: USDC_ADDRESS as `0x${string}`,
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
      } as const;
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
      const message = {
        owner: address as `0x${string}`,
        spender: COFFEE_SHOP_PROXY_ADDRESS as `0x${string}`, // TODO: Replace with current proxy address for coffee shop upon registration.
        value: BigInt(convertedAmount), // Replace with actual value
        nonce: BigInt(Number(nonce.data)), // Replace with actual nonce
        deadline: BigInt(deadline), // 20 minutes from now
      } as const;

      try {
        // This was defaulting to mainnet - have to manually switch to the correct chain. 
        // This was causing all kinds of issues for a while.
        await useChainResult.switchChainAsync({ chainId: base.id });

        console.log("domain: ", domain);
        console.log("types: ", types);
        console.log("message: ", message);
        const signatureResult = await signTypedDataAsync({
          domain,
          types,
          primaryType: 'Permit',
          message
        });
        console.log("signatureResult: ", signatureResult);

        const { v, r, s } = parseSignature(signatureResult);
        console.log("v: ", v);
        console.log("r: ", r);
        console.log("s: ", s);

        const paid = await writeContractAsync({
          abi: COFFEE_SHOP_ABI,
          address: COFFEE_SHOP_PROXY_ADDRESS,
          functionName: 'pay',
          args: [
            convertedAmount,
            deadline,
            v,
            r,
            s
          ],
          chainId: base.id
        });

        console.log("paid: ", paid);
      } catch (error) {
        console.error("Error when paying: ", error);
      }
    };

    return (
      <Button colorScheme="teal" className="cafebabe-title" onClick={payWithTransaction} isDisabled={!amount}>
        Pay
      </Button>);
  }

  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={"0dD2uvTjYG7Wp6QfzenzTi_OiY_Of91P"} chain={base}>
          <Container maxW="container.md" centerContent>
            <Box position="absolute" top={4} right={4}>
            </Box>
            <Center className={accountStatus === 'connected' ? 'connected' : 'not-connected'}>
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
                <Box w="full" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" textAlign="center" bg="blue.50">
                  {accountStatus === 'disconnected' && <Text fontSize="small" className="cafebabe-title" mb={2}>Connection</Text>}
                  {connectedAddress && <b><Center><Avatar
                    loadingComponent={(
                      <div className="h-8 w-8">
                        <svg width="100%" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <polygon points="6,1 14,1 19,6 19,14 14,19 6,19 1,14 1,6" fill="yellow" stroke="yellow" stroke-width="1" />
                        </svg>
                      </div>
                    )}
                    defaultComponent={(
                      <div className="h-8 w-8">
                        <svg width="100%" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <polygon points="6,1 14,1 19,6 19,14 14,19 6,19 1,14 1,6" fill="green" stroke="green" stroke-width="1" />
                        </svg>
                      </div>
                    )}
                    address={connectedAddress} />
                  </Center></b>}
                  {connectedAddress && <b><Address className="cafebabe-title" address={connectedAddress} /></b>}
                  <AccountConnect />
                </Box>

                {accountStatus === 'connected' && (
                  <VStack>
                    <Box w="full" p={4} borderWidth="1px" borderRadius="lg" textAlign="center" overflow="hidden" bg="blue.50">
                      <Text fontSize="small" className="cafebabe-title" mb={2}>Order total</Text>
                      <VStack spacing={4}>
                        <Input
                          className="cafebabe-title"
                          placeholder={"amount"}
                          maxLength={20}
                          onChange={handleAmountChange}
                          w="300px"
                        />
                        <PayButton />
                      </VStack>
                    </Box>

                    <Box w="full" p={4} borderWidth="1px" borderRadius="lg" textAlign="center" overflow="hidden" bg="gray.50" mt={4}>
                      <Text fontSize="medium" className="cafebabe-title" mb={2}><b>Account</b></Text>
                      <Text marginTop={5} fontSize="small" className="cafebabe-title"><b>Loyalty Scheme</b><br />{loyaltyMessage}<br /></Text>
                      <Text marginTop={5} fontSize="small" className="cafebabe-title"><b>Last Visit</b> <br />{lastVisit}</Text>
                    </Box>
                  </VStack>
                )}

                {freeCoffeeMessage && (
                  <Box color="blue.500" mt="4" textAlign="center">
                    {freeCoffeeMessage}
                  </Box>
                )}
                {error && (
                  <Box color="#FF7074" mt="4" textAlign="center">
                    {error}
                  </Box>
                )}
                {transactionHash && (
                  <Box color="green.500" mt="4" textAlign="center">
                    {`Transaction Hash: ${transactionHash}`}
                  </Box>
                )}
              </VStack>
            </Center>
          </Container>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
