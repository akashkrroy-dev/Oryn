import { AuthProvider } from "@/components/session-provider";
import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Premium Startup Boilerplate",
  description: "Created using the ultimate interactive Next.js stack generator CLI.",
};

const primary = localFont({
  src: [
    { path: "../assets/fonts/primary/helvetica-light-587ebe5a59211.ttf", weight: "300", style: "normal" },
    { path: "../assets/fonts/primary/Helvetica.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/primary/Helvetica-Bold.ttf", weight: "700", style: "normal" }, // check this file exists
  ],
  variable: "--font-primary",
  display: "swap",
});

const secondary = localFont({
  src: [
    { path: "../assets/fonts/secondary/ClashDisplay-Extralight.woff2", weight: "200", style: "normal" },
    { path: "../assets/fonts/secondary/ClashDisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "../assets/fonts/secondary/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/secondary/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/secondary/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/secondary/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-secondary",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        style={{ margin: 0, padding: 0 }}
        className={`${primary.variable} ${secondary.variable} font-primary`}
      >
      
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
