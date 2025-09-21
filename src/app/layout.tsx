import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Blog",
  description: "Personal Tech Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NavBar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
