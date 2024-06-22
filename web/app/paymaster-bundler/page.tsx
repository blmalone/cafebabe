'use client';
import Banner from '@/components/layout/banner/banner';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import PaymasterBundlerApp from './_components/PaymasterBundlerDemo';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function PaymasterBundlerPage() {
  return (
    <>
      <Header />
      <Main>
        <Banner pageName="Paymaster Bundler" pageUrl="paymaster-bundler" wip />
        <div className="rounded-lg bg-gray-900 px-4 py-6 text-white">
          <PaymasterBundlerApp />
        </div>
      </Main>
    </>
  );
}
