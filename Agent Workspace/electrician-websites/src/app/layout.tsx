import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Stevenson's Electric Service Co. | Electrician in Palm Coast, FL",
    template: "%s | Stevenson's Electric Service Co.",
  },
  description:
    "Stevenson's Electric Service Co. — licensed electrician in Palm Coast, FL. Panel upgrades, EV chargers, generators & 24/7 emergency service. Call (386) 444-1726.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? 'https://trustedelectricpros.com'
  ),
  verification: {
    google: 'dD16qbQ9jwFbs2Oc_EzURiRYAw5OUbMKFZbHTsUZi2I',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: "Stevenson's Electric Service Co., Inc.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        {children}

        {/* GoHighLevel Chat Widget – Stevenson Electric Chat */}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="69d64e723d6e162a6b6e8bd4"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
