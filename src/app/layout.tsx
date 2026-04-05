import type { Metadata } from "next";
import "./globals.css";
import { DiscoveryProvider } from "@/context/DiscoveryContext";

export const metadata: Metadata = {
  title: "AI Business Discovery Framework",
  description: "Discover how AI can optimize your business workflows and maximize outcomes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">
        <DiscoveryProvider>{children}</DiscoveryProvider>
      </body>
    </html>
  );
}
