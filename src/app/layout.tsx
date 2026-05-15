import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benefiqs Admin Panel",
  description: "Admin dashboard for managing Benefiqs platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-dark-navy text-white antialiased">{children}</body>
    </html>
  );
}
