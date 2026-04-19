import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PWM Power System Calculator | Arknights: Endfield",
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
