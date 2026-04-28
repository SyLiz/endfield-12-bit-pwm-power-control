import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "12 Bit PWM Power Control | Arknights: Endfield",
  description: "Calculate binary power distribution for the PWM Power System from Arknights: Endfield",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
