'use client';

import { useEffect, useState } from 'react';
import Banner from '@/components/layout/banner/banner';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import BuyMeCoffeeContractDemo from './_components/ContractDemo';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function BuyMeCoffeePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //  Fix hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Header />
      <Main>
        <BuyMeCoffeeContractDemo />
      </Main>
    </>
  );
}
