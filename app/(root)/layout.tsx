import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import Header from "@/components/Header";
import { ToasterProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KAP - Kit à Planter",
  description: "Test Technique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ToasterProvider />
        <div className="fixed top-0 z-30 w-full flex justify-center">
          <Header />
        </div>
        {children}
      </body>
    </html>
  );
}
