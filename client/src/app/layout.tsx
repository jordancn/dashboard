import { AppStateProvider } from "@/Providers/AppStateProvider";
import { DeviceDataProvider } from "@/Providers/DeviceDataProvider";
import { ErrorStateProvider } from "@/Providers/ErrorStateProvider";
import { GraphQLProvider } from "@/Providers/GraphQLProvider";
import { SidebarDataProvider } from "@/Providers/SidebarDataProvider";
import { Error } from "@/Templates/Error";
import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        <ErrorStateProvider>
          <AppStateProvider>
            <DeviceDataProvider>
              <Error />
              <SidebarDataProvider>
                <GraphQLProvider>{children}</GraphQLProvider>
              </SidebarDataProvider>
            </DeviceDataProvider>
          </AppStateProvider>
        </ErrorStateProvider>
      </body>
    </html>
  );
}
