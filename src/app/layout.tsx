import type { Metadata } from 'next';
import '@/app/ui/globals.css';
import Footer from './_components/footer';

export const metadata: Metadata = {
  title: 'Pokémon TCG Pocket Card Tracker',
  description: 'Track your Pokémon TCG Pocket card collection',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-100 via-85% to-blue-200 bg-fixed">
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
