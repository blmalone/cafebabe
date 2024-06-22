'use client';
import { useEffect, useState } from 'react';
import { ethers, Signer } from 'ethers';
import Banner from '@/components/layout/banner/banner';
import NextLink from 'next/link';
import { useAccount } from 'wagmi';
import Header from '@/components/layout/header/Header';
import clsx from 'clsx';

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
<main className="container mx-auto flex flex-col items-center justify-center px-8 py-16">
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

  <div className="flex w-full min-w-36 items-center justify-center md:w-fit mt-8">
    <NextLink
      href={`/buy-me-coffee`}
      className={clsx(
        'font-inter w-full rounded-3xl bg-white px-4 py-2',
        'text-center text-sm font-medium leading-normal text-black no-underline',
      )}
    >
      Buy a coffee
    </NextLink>
  </div>
</main>

    </>
  );
}
