import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SplashScreen } from "./SplashScreen";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FoxAnimations } from "@/components/FoxAnimations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mozilla Campus Club SLIIT",
  description: "Official website of Mozilla Campus Club at SLIIT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const senderAccountId = process.env.NEXT_PUBLIC_SENDER_ACCOUNT_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Navbar />
          <SplashScreen>
            <FoxAnimations />
            <main className="flex-1">{children}</main>
          </SplashScreen>

          <Footer />
        </div>
        <Script id="sender-universal" strategy="afterInteractive">
          {`
          (function (s, e, n, d, er) {
            s['Sender'] = er;
            s[er] = s[er] || function () {
              (s[er].q = s[er].q || []).push(arguments)
            }, s[er].l = 1 * new Date();
            var a = e.createElement(n),
                m = e.getElementsByTagName(n)[0];
            a.async = 1;
            a.src = d;
            m.parentNode.insertBefore(a, m)
          })(window, document, 'script', 'https://cdn.sender.net/accounts_resources/universal.js', 'sender');
          sender('${senderAccountId}');
        `}
        </Script>
      </body>
    </html>
  );
}
