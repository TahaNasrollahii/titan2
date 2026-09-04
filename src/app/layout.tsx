import type { Metadata } from "next";
import "./globals.css";
import BackgroundManager from "@/components/effects/BackgroundManager";
export const metadata: Metadata = {
  title: "TITAN — پلتفرم گیمینگ و اسپورت",
  description: "بازی کن. رقابت کن. فتح کن. پلتفرم گیمینگ و مسابقات اسپورت تایتان — فروشگاه محصولات دیجیتال گیمینگ و تورنمنت‌های حرفه‌ای",
  keywords: ["گیمینگ", "اسپورت", "تورنمنت", "فورتنایت", "ولورنت", "تایتان", "بازی"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <BackgroundManager />
        {children}
      </body>
    </html>
  );
}
