import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Juno: Next.js Example',
  description: 'Welcome to my app!'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black">{children}</body>
    </html>
  );
}
