import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'CMEGP-Garhwa',
  description: 'Garhwa CMEGP Database',
  keywords: 'CMEGP, Garhwa, Jharkhand',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {/* Wrap children in Providers for context, auth, or theme */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
