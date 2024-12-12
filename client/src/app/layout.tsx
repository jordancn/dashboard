import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ApolloProviderWrapper from "./apollo-provider";
import "./globals.css";
import { AppStateProvider } from "@/Components/Providers/AppStateProvider";
import { SidebarDataProvider } from "@/Components/Providers/SidebarDataProvider";
import { DeviceDataProvider } from "@/Components/Providers/DeviceDataProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Financial dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppStateProvider>
          <DeviceDataProvider>
            <SidebarDataProvider>
              <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
            </SidebarDataProvider>
          </DeviceDataProvider>
        </AppStateProvider>
      </body>
    </html>
  );
}
