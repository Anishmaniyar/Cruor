import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VitalDrops — Blood Donation & Hospital Inventory Management",
  description: "Connect donors and hospitals. Manage appointments, campaigns, donations, blood inventory, requests, and transfers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
