import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Center,
  Container,
  useToast,
} from "@chakra-ui/react";
import { ConnectAccount } from '@coinbase/onchainkit/esm/wallet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, useAccount, useDisconnect, useSignTypedData, useChainId, useReadContract, useWriteContract, createConfig, http, useSwitchChain } from 'wagmi';
// import {getGasPrice} from "@wagmi/core"; 
import { base, baseSepolia } from 'wagmi/chains';
import '@coinbase/onchainkit/src/styles.css';
import { coinbaseWallet } from 'wagmi/connectors';
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { USDC_ABI } from "./abi/USDC";
import { parseUnits, parseSignature, parseGwei } from "viem";
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
  const [amount, setAmount] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [freeCoffeeMessage, setFreeCoffeeMessage] = useState<string>("");
  const toast = useToast();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amt = e.target.value;
    setAmount(amt);
  };

  // const signPermit = async (signer: ethers.Signer, amount: ethers.BigNumber) => {
  //   const domain = {
  //     name: "USD Coin",
  //     version: "2",
  //     chainId: (await signer.provider!.getNetwork()).chainId,
  //     verifyingContract: USDC_ADDRESS,
  //   };

  //   const types = {
  //     Permit: [
  //       { name: "owner", type: "address" },
  //       { name: "spender", type: "address" },
  //       { name: "value", type: "uint256" },
  //       { name: "nonce", type: "uint256" },
  //       { name: "deadline", type: "uint256" },
  //     ],
  //   };

  //   const value = {
  //     owner: account,
  //     spender: COFFEE_SHOP_ADDRESS,
  //     value: amount,
  //     nonce: await new ethers.Contract(
  //       USDC_ADDRESS,
  //       ["function nonces(address owner) view returns (uint256)"],
  //       signer
  //     ).nonces(account),
  //     deadline: Math.floor(Date.now() / 1000) + 60 * 20,
  //   };

  //   const signature = await signer._signTypedData(domain, types, value);
  //   const { v, r, s } = ethers.utils.splitSignature(signature);

  //   return { value, v, r, s };
  // };

  // const checkUSDCBalance = async (signer: ethers.Signer, amountInWei: ethers.BigNumber) => {
  //   const usdcContract = new ethers.Contract(
  //     USDC_ADDRESS,
  //     ["function balanceOf(address owner) view returns (uint256)"],
  //     signer
  //   );
  //   const balance = await usdcContract.balanceOf(account);
  //   return balance.gte(amountInWei);
  // };

  const fetchExchangeRate = async (fromCurrency: string) => {
    const baseUrl = "https://api.coingecko.com/api/v3/simple/price";
    const ids = fromCurrency === "usdc" ? "usd" : "gbp";
    const response = await fetch(`${baseUrl}?ids=${ids}&vs_currencies=eth`);
    const data = await response.json();
    return data[ids].eth;
  };

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
      } else if (status === 'disconnected') {
        setAccountStatus('disconnected');
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
                  style={{ backgroundColor: '#FF7074', color: 'white' }} // Inline styles as a fallback
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
    //const { address, chainId, chain } = useAccount({config:wagmiConfig});
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
      <Button colorScheme="teal" onClick={payWithTransaction} isDisabled={!amount}>
        Pay
      </Button>);
  }

  const queryClient = new QueryClient();
  // <Avatar address="0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9" />
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={"0dD2uvTjYG7Wp6QfzenzTi_OiY_Of91P"} chain={base}>
          <Container maxW="container.md" centerContent>
            <Box position="absolute" top={4} right={4}>
            </Box>
            <Center h="100vh">
              <VStack spacing={6}>
                <VStack spacing={0} textAlign="center">
                  <Text
                    fontSize={["2em", "3em", "4em", "5em"]}
                    fontWeight="600"
                    color={COINBASE_BLUE}
                  >
                    cafebabe
                  </Text>
                  <Text
                    fontSize={["1em", "1.25em", "1.5em", "1.75em"]}
                    fontWeight="600"
                    color={COINBASE_BLUE}
                    opacity={0.8}
                  >
                    Let's buy a coffee on Base
                  </Text>
                </VStack>
                <Box w="full" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" textAlign="center" bg="blue.50">
                  <Text fontSize="lg" fontWeight="bold" mb={2}>Connection Information</Text>
                  <AccountConnect />
                </Box>

                {accountStatus === 'connected' && (
                  <Box w="full" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" bg="blue.50">
                    <VStack spacing={4}>
                      <Input
                        placeholder={"dollars"}
                        maxLength={20}
                        onChange={handleAmountChange}
                        w="300px"
                      />
                      {/* <Button colorScheme="teal" onClick={payWithTransaction} isDisabled={!amount}>
                        Pay
                      </Button> */}
                      <PayButton />
                    </VStack>
                  </Box>)}
                {freeCoffeeMessage && (
                  <Box color="blue.500" mt="4" textAlign="center">
                    {freeCoffeeMessage}
                  </Box>
                )}
                {error && (
                  <Box color="red.500" mt="4" textAlign="center">
                    {error.message}
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
