import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import UseProModalProvider from "@/components/use-pro-modal-provider";
import { Toaster } from "@/components/ui/toaster";
import CrispProvider from "@/components/crisp-chatbox-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "S-AI",
  description: "An AI service created by developer Saqib Hussain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <UseProModalProvider />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
