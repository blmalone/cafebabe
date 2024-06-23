'use client';

import NextLink from 'next/link';
import { useAccount } from 'wagmi';
import Header from '@/components/layout/header/Header';
import clsx from 'clsx';
import { createWagmiConfig } from '@/store/createWagmiConfig';
// import { QueryClient } from '@tanstack/react-query';

export default function HomePage() {

  const rpcUrl = '/api/rpc';
  const wagmiConfig = createWagmiConfig(rpcUrl);
  console.log("HomePage: wagmiConfig.state.chainId " + wagmiConfig.state.chainId);

  const account = useAccount(wagmiConfig as any);
  console.log("HomePage.chainId:", account.chainId);

  const account2 = useAccount();
  console.log("HomePage.chainId without external config:", account2.chainId);

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
