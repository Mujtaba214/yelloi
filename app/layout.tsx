import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space" 
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Yelloi - AI Image Prompt Discovery",
  description: "Discover thousands of stunning AI-generated images. Find inspiration for Midjourney, Flux, DALL-E, and more.",
  
  openGraph: {
    title: "Yelloi - AI Image Prompt Discovery",
    description: "Discover thousands of stunning AI-generated images. Find inspiration for Midjourney, Flux, DALL-E, and more.",
    url: "https://yelloi.com",
    siteName: "Yelloi",
    images: [
      {
        url: "https://yelloi.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yelloi - AI Image Prompt Discovery",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    // apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 🔥 Force favicon loading */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#050505" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}