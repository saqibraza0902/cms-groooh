import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ReduxProvider from "@/providers/redux-provider";
import NextTopLoader from "nextjs-toploader";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ReactToastProvider from "@/providers/toast-provider";
import fav from "../../public/icons/favicon.png";
const inter = Inter({ subsets: ["latin"] });
export const revalidate = 0;
export const metadata: Metadata = {
  title: "Grooh",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/icons/favicon.png" sizes="any" />
      <body suppressHydrationWarning={true} className="font-Suisse">
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <AppRouterCacheProvider>
          <ReactToastProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ReduxProvider>{children}</ReduxProvider>
            </ThemeProvider>
          </ReactToastProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
