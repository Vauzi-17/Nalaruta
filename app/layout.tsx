import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nalaruta – Master Your Vocational Future",
  description:
    "Clear, interactive roadmaps designed to take you from beginner to professional in high-demand vocational fields.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}