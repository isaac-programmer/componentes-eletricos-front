import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/infra/providers/QueryProvider";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";
import "./globals.css";

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
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            success: {
              style: {
                background: "#28a745",
                color: "white",
              },
            },
            error: {
              style: {
                background: "#dc3545",
                color: "white",
              },
            },
          }}
        />
        <QueryProvider>
          <BreadcrumbProvider>
            {children}
          </BreadcrumbProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
