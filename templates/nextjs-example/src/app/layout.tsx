import type {Metadata} from 'next';
import {JetBrains_Mono} from 'next/font/google';
import './globals.css';

const jetBrainsMono = JetBrains_Mono({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Juno / Next.js Example',
  description: 'Welcome to my app!'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.className} bg-white dark:bg-black`}>{children}</body>
    </html>
  );
}
