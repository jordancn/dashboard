import { AppStateProvider } from "@/Providers/AppStateProvider";
import { DeviceDataProvider } from "@/Providers/DeviceDataProvider";
import { ErrorStateProvider } from "@/Providers/ErrorStateProvider";
import { GraphQLProvider } from "@/Providers/GraphQLProvider";
import { SidebarDataProvider } from "@/Providers/SidebarDataProvider";
import { SocketProvider } from "@/Providers/SocketProvider";
import { Error } from "@/Templates/Error";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Financial dashboard",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorStateProvider>
          <AppStateProvider>
            <SocketProvider>
              <DeviceDataProvider>
                <Error />
                <SidebarDataProvider>
                  <GraphQLProvider>{children}</GraphQLProvider>
                </SidebarDataProvider>
              </DeviceDataProvider>
            </SocketProvider>
          </AppStateProvider>
        </ErrorStateProvider>
      </body>
    </html>
  );
}
