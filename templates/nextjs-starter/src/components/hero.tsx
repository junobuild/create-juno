import type { FunctionComponent, PropsWithChildren } from "react";

interface HeroProps {
  href: string;
  ariaLabel: string;
}

export const Hero: FunctionComponent<PropsWithChildren<HeroProps>> = ({
  href,
  ariaLabel,
  children,
}) => {
  return (
    <a
      href={href}
      rel="noreferrer noopener"
      target="_blank"
      aria-label={ariaLabel}
      className="bg-lavender-blue-500 dark:border-lavender-blue-500 hover:bg-lavender-blue-400 active:bg-lavender-blue-600 col-span-2 rounded-sm border-[3px] border-black px-4 py-3 text-center text-lg font-extrabold text-white shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[8px] active:translate-y-[8px] active:shadow-none dark:bg-white dark:text-black dark:shadow-[8px_8px_0px_#7888FF] dark:hover:border-white dark:hover:bg-black dark:hover:text-white dark:hover:shadow-[8px_8px_0px_#fff] dark:active:bg-black"
    >
      {children}
    </a>
  );
};
