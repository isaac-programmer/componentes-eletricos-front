import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/infra/providers/QueryProvider";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "Inventário de Componentes Elétricos",
  description: "Gerenciador de componentes eletrônicos da UFC - Sobral",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={onest.variable}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
