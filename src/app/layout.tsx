import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TITAN — پلتفرم گیمینگ و اسپورت",
  description: "بازی کن. رقابت کن. فتح کن. پلتفرم گیمینگ و مسابقات اسپورت تایتان",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
