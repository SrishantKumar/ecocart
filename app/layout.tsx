import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/layout/Header';
import { EcoContextProvider } from '@/contexts/EcoContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EcoMart - Sustainable Shopping',
  description: 'Shop sustainably with EcoMart - Track your carbon footprint, discover eco-friendly alternatives, and choose green delivery routes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <EcoContextProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </div>
            <Toaster />
          </EcoContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}