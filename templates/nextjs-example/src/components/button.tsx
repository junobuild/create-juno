import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: (() => Promise<void>) | (() => void);
  disabled?: boolean;
  testId?: string;
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  testId,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-tid={testId}
      className={`dark:border-lavender-blue-500 bg-lavender-blue-500 my-2 flex items-center gap-2 rounded-xs border-[3px] border-black px-8 py-1 font-semibold text-white shadow-[5px_5px_0px_rgba(0,0,0,1)] transition-all dark:bg-black dark:shadow-[5px_5px_0px_#7888ff] ${disabled ? "opacity-25" : "hover:bg-lavender-blue-600 dark:hover:bg-lavender-blue-300 active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 active:translate-x-[5px] active:translate-y-[5px] active:shadow-none dark:hover:text-black"}`}
    >
      {children}
    </button>
  );
};
