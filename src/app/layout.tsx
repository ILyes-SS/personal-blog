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
      <body className={`min-h-screen antialiased`}>
        <NavBar />
        <main className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
