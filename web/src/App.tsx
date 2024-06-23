import React, { useEffect, useState } from "react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
  Center,
  Container,
  useToast,
} from "@chakra-ui/react";
import SelectWalletModal from "./components/Modal";
import { COFFEE_SHOP_ABI } from "./abi/CoffeeShopAbi";
import { ethers } from "ethers";

const COFFEE_SHOP_ADDRESS = "0x96db4d9244753a220782accbe649734970db121d";
const USDC_ADDRESS = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";
const USDC_DECIMALS = 6;
const BASE_CHAIN_ID = 8453;
const COINBASE_BLUE = "#0052ff";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [provider, setProvider] = useState<any>();
  const [account, setAccount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [chainId, setChainId] = useState<number>();
  const [amount, setAmount] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string>("");
  const [freeCoffeeMessage, setFreeCoffeeMessage] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("Input Total (in dollars)");
  const toast = useToast();

  const toHex = (num: number) => {
    return "0x" + num.toString(16);
  };

  const connectWithProvider = async (provider: any) => {
    try {
      setProvider(provider);
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      if (accounts) {
        setAccount(accounts[0]);
      }
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(BASE_CHAIN_ID) }],
      });
      setChainId(BASE_CHAIN_ID);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amt = e.target.value;
    setAmount(amt);
  };

  const signPermit = async (signer: ethers.Signer, amount: ethers.BigNumber) => {
    const domain = {
      name: "USD Coin",
      version: "2",
      chainId: (await signer.provider!.getNetwork()).chainId,
      verifyingContract: USDC_ADDRESS,
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

    const value = {
      owner: account,
      spender: COFFEE_SHOP_ADDRESS,
      value: amount,
      nonce: await new ethers.Contract(
        USDC_ADDRESS,
        ["function nonces(address owner) view returns (uint256)"],
        signer
      ).nonces(account),
      deadline: Math.floor(Date.now() / 1000) + 60 * 20,
    };

    const signature = await signer._signTypedData(domain, types, value);
    const { v, r, s } = ethers.utils.splitSignature(signature);

    return { value, v, r, s };
  };

  const checkUSDCBalance = async (signer: ethers.Signer, amountInWei: ethers.BigNumber) => {
    const usdcContract = new ethers.Contract(
      USDC_ADDRESS,
      ["function balanceOf(address owner) view returns (uint256)"],
      signer
    );
    const balance = await usdcContract.balanceOf(account);
    return balance.gte(amountInWei);
  };

  const fetchExchangeRate = async (fromCurrency: string) => {
    const baseUrl = "https://api.coingecko.com/api/v3/simple/price";
    const ids = fromCurrency === "usdc" ? "usd" : "gbp";
    const response = await fetch(`${baseUrl}?ids=${ids}&vs_currencies=eth`);
    const data = await response.json();
    return data[ids].eth;
  };

  const payWithTransaction = async () => {
    if (!provider || !amount) return;

    try {
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const contract = new ethers.Contract(COFFEE_SHOP_ADDRESS, COFFEE_SHOP_ABI, signer);

      const amountInWei = ethers.utils.parseUnits(amount, USDC_DECIMALS);
      let receipt;

      const hasEnoughUSDC = await checkUSDCBalance(signer, amountInWei);

      if (!hasEnoughUSDC) {
        const rate = await fetchExchangeRate("usdc");
        const ethAmount = ethers.utils.parseUnits((amount / rate).toString(), "ether");

        const tx = await signer.sendTransaction({
          to: COFFEE_SHOP_ADDRESS,
          value: ethAmount,
        });
        receipt = await tx.wait();
        setTransactionHash(receipt.transactionHash);
        toast({
          title: "Payment successful",
          description: "Payment made using ETH.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const { value, v, r, s } = await signPermit(signer, amountInWei);

        const tx = await contract.pay(amountInWei, value.deadline, v, r, s);
        receipt = await tx.wait();
        setTransactionHash(receipt.transactionHash);
      }

      let freeCoffeeGranted = false;
      let numCoffees = 0;
      let numCoffeesLeft = 0;

      for (const log of receipt.logs) {
        try {
          const parsedLog = contract.interface.parseLog(log);
          if (parsedLog.name === "FreeCoffee") {
            freeCoffeeGranted = true;
            break;
          } else if (parsedLog.name === "Payment") {
            numCoffees = parsedLog.args.numCoffees.toNumber();
            numCoffeesLeft = 9 - (numCoffees % 9);
            numCoffees += 1;
            var isNextCoffeeFree = (numCoffees % 9) === 0;
          }
        } catch (e) {
        }
      }

      if (freeCoffeeGranted) {
        setFreeCoffeeMessage("Congratulations! You got a free coffee!");
      } else if (isNextCoffeeFree) {
        setFreeCoffeeMessage(`Payment successful. Your next coffee is free!.`);
      } else if (numCoffees > 0) {
        setFreeCoffeeMessage(`Payment successful. You have ${numCoffeesLeft} coffee${numCoffeesLeft === 1 ? '' : 's'} left until your next free one.`);
      } else {
        setFreeCoffeeMessage("Payment successful. Enjoy your coffee!");
      }

    } catch (error: any) {
      let errorMessage = error.message;

      if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
        const errorData = error.data?.originalError?.data;
        if (errorData) {
          const reason = ethers.utils.toUtf8String('0x' + errorData.slice(138));
          errorMessage = `Transaction failed: ${reason}`;
        }
      }

      setError(new Error(errorMessage));
    }
  };

  const refreshState = () => {
    setAccount("");
    setChainId(undefined);
    setAmount("");
    setTransactionHash("");
    setFreeCoffeeMessage("");
  };

  const disconnect = () => {
    refreshState();
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId: string) => {
        setError(`Chain changed: ${_hexChainId}`);
        setChainId(parseInt(_hexChainId, 16));
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <Container maxW="container.md" centerContent>
      <Box position="absolute" top={4} right={4}>
      </Box>
      <Center h="100vh">
        <VStack spacing={6}>
          <VStack spacing={0} textAlign="center">
            <Text
              fontSize={["1.5em", "2em", "3em", "4em"]}
              fontWeight="600"
              color={COINBASE_BLUE}
            >
              0xCafeBabe
            </Text>
            <Text
              fontSize={["1.25em", "1.75em", "2.5em", "3em"]}
              fontWeight="600"
              color={COINBASE_BLUE}
              opacity={0.8}
            >
              Let's buy a coffee on Base
            </Text>
          </VStack>
          <Box w="full" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" textAlign="center" bg="blue.50">
            <Text fontSize="lg" fontWeight="bold" mb={2}>Connection Information</Text>
            {!account ? (
              <Button colorScheme="teal" onClick={onOpen}>Connect Wallet</Button>
            ) : (
              <>
                <HStack justifyContent="center" mb={2}>
                  <Text>{`Connection Status: `}</Text>
                  {account ? (
                    <CheckCircleIcon color="green" />
                  ) : (
                    <WarningIcon color="#cd5700" />
                  )}
                </HStack>
                <Tooltip label={account} placement="right">
                  <Text>{`Account: ${account}`}</Text>
                </Tooltip>
                <Text>{`Network: Base`}</Text>
                <Button mt={2} colorScheme="red" onClick={disconnect}>Disconnect</Button>
              </>
            )}
          </Box>
  
          {account && (
            <Box w="full" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" bg="blue.50">
              <VStack spacing={4}>
                <Input
                  placeholder={placeholder}
                  maxLength={20}
                  onChange={handleAmountChange}
                  w="200px"
                />
                <Button colorScheme="teal" onClick={payWithTransaction} isDisabled={!amount}>
                  Pay
                </Button>
              </VStack>
            </Box>
          )}
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
      <SelectWalletModal
        isOpen={isOpen}
        closeModal={onClose}
        connectWithProvider={connectWithProvider}
      />
    </Container>
  );
}
