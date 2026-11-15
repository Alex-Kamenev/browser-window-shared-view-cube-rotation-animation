import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shared Browser Window Animation',
  description:
    'A rotating cube with position and animation synchronized among browser windows.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
