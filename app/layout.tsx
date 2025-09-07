import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EthioGuide - Navigate Ethiopia's Services with AI Guidance",
  description: "Your comprehensive guide to Ethiopian government services, procedures, and documentation. Get AI-powered assistance for visa applications, work permits, citizenship processes, and more.",
  keywords: "Ethiopia, government services, visa, work permit, citizenship, AI guidance, procedures",
  authors: [{ name: "EthioGuide Team" }],
  openGraph: {
    title: "EthioGuide - Navigate Ethiopia's Services with AI Guidance",
    description: "Your comprehensive guide to Ethiopian government services, procedures, and documentation.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
  <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}