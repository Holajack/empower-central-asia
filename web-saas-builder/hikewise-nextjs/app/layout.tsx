import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@/components/analytics/analytics";

const GA_ID = "G-1NSGDLEH0S";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hikewise.app"),
  title: {
    default: "HikeWise - Smart Study Tracking for Focused Students",
    template: "%s | HikeWise",
  },
  description:
    "Transform your study habits with HikeWise. Track focus sessions, compete with friends, and achieve your academic goals with AI-powered insights.",
  keywords: [
    "study app",
    "study companion app",
    "study tracker app",
    "smart study planner",
    "study habit tracker",
    "AI study planner app",
    "focus timer for students",
    "study progress tracker",
    "AI study companion",
    "focus timer",
    "pomodoro technique",
    "study tracker",
    "academic goals",
    "best study apps for students",
    "study streak app",
    "exam preparation tracker",
  ],
  authors: [{ name: "HikeWise Team" }],
  creator: "HikeWise",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hikewise.app",
    siteName: "HikeWise",
    title: "HikeWise - Smart Study Tracking for Focused Students",
    description:
      "Transform your study habits with HikeWise. Track focus sessions, compete with friends, and achieve your academic goals with AI-powered insights.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "HikeWise - Smart Study Tracking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HikeWise - Smart Study Tracking for Focused Students",
    description:
      "Transform your study habits with HikeWise. Track focus sessions, compete with friends, and achieve your academic goals.",
    images: ["/images/og-image.png"],
    creator: "@hikewise",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="llms-txt" href="/llms.txt" />
      </head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <body className={`${jakarta.variable} ${geistMono.variable} font-sans`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[999] focus:top-4 focus:left-4 focus:bg-forest focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
        >
          Skip to content
        </a>
        <Analytics />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
