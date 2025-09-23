import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIFLOW - Facturacion",
  description: "Sistema de Informacion Integrado Administrativo Financiero",
  icons: {
    icon: "/logo-redondo.svg", // Favicon principal
    shortcut: "/logo-redondo.svg", // Atajo
    apple: "/logo-redondo.svg", // Para iOS
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <StoreProvider>
        
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
