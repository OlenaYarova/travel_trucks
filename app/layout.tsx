import type { Metadata } from "next";
import {Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Travel Trucks",
  description: "Find your perfect camper van for your next adventure with Travel Trucks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <TanStackProvider>
        <Header />
          <main>{children}</main>
        </TanStackProvider>
     </body>
    </html>
  );
}
