import clsx from 'clsx';
import Image from 'next/image';
import NextLink from 'next/link';

type BannerProps = {
  pageName: string;
  pageUrl: string;
  wip?: boolean;
};

export default function Banner({ pageName, pageUrl, wip }: BannerProps) {
  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-between gap-6 p-6 md:flex-row md:gap-0',
        `rounded-lg border border-zinc-400 border-opacity-10 bg-neutral-900  ${
          wip ? 'text-boat-color-yellow-70' : 'text-white'
        }`,
      )}
    >
      <div className="flex w-full min-w-36 items-center justify-end md:w-fit">
        <NextLink
          href={`/${pageUrl}`}
          className={clsx(
            'font-inter w-full rounded-3xl bg-white px-4 py-2',
            'text-center text-sm font-medium leading-normal text-black no-underline',
          )}
        >
          Buy a coffee
        </NextLink>
      </div>
    </section>
  );
}
