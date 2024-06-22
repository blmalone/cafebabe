'use client';
import { useEffect, useState } from 'react';
import { ethers, Signer } from 'ethers';

import { useAccount } from 'wagmi';
import Header from '@/components/layout/header/Header';

const COFFEE_SHOP_ABI = [{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "newBasisPoints", "type": "uint256" }], "name": "BasisPointsUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "payer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "FreeCoffee", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "points", "type": "uint256" }], "name": "LoyaltyPointsUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "newMinAmount", "type": "uint256" }], "name": "MinAmountUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "payer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Payment", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "newUsdc", "type": "address" }], "name": "UsdcAddressUpdated", "type": "event" }, { "inputs": [], "name": "basisPoints", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "generateRandomNumber", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getLoyaltyPoints", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getUsdcAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "address", "name": "_usdcAddress", "type": "address" }, { "internalType": "uint256", "name": "_numPurchasesBeforeFree", "type": "uint256" }], "name": "initializePredictableLoyaltyScheme", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "address", "name": "_usdcAddress", "type": "address" }, { "internalType": "uint256", "name": "_basisPoints", "type": "uint256" }], "name": "initializeRandomizedLoyaltyScheme", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "loyaltyPoints", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "minAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "numPurchasesBeforeFree", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "pay", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newBasisPoints", "type": "uint256" }], "name": "updateBasisPoints", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newMinAmount", "type": "uint256" }], "name": "updateMinAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newUsdc", "type": "address" }], "name": "updateUsdcAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "usdc", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];
const COFFEE_SHOP_PROXY_ADDRESS = '0x9487C5e6eF2aeb9e684566F785359712EAF7A17F';
const USDC_ADDRESS = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913';
const USDC_DECIMALS = 6;
const BASE_CHAIN_ID = 8453;
const COINBASE_BLUE = '#0052ff';

export default function HomePage() {
  const account = useAccount();

  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col px-8 py-16">
        <div>
          <h2 className="text-xl">Developer information</h2>
          <br />
          <h3 className="text-lg">Account</h3>
          <ul>
            <li>
              <b>status</b>: {account.status}
            </li>
            <li>
              <b>addresses</b>: {JSON.stringify(account.addresses)}
            </li>
            <li>
              <b>chainId</b>: {account.chainId}
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
