import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

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
    <html lang="en">
      <body>
        <TanStackProvider>
        <Header />
          <main>{children}</main>
        </TanStackProvider>
     </body>
    </html>
  );
}
